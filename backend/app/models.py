import uuid
from datetime import datetime
from decimal import Decimal

from pydantic import EmailStr
from sqlmodel import Field, Relationship, SQLModel


# Shared properties
class UserBase(SQLModel):
    email: EmailStr = Field(unique=True, index=True, max_length=255)
    is_active: bool = True
    is_superuser: bool = False
    full_name: str | None = Field(default=None, max_length=255)


# Properties to receive via API on creation
class UserCreate(UserBase):
    password: str = Field(min_length=8, max_length=40)


class UserRegister(SQLModel):
    email: EmailStr = Field(max_length=255)
    password: str = Field(min_length=8, max_length=40)
    full_name: str | None = Field(default=None, max_length=255)


# Properties to receive via API on update, all are optional
class UserUpdate(UserBase):
    email: EmailStr | None = Field(default=None, max_length=255)  # type: ignore
    password: str | None = Field(default=None, min_length=8, max_length=40)


class UserUpdateMe(SQLModel):
    full_name: str | None = Field(default=None, max_length=255)
    email: EmailStr | None = Field(default=None, max_length=255)


class UpdatePassword(SQLModel):
    current_password: str = Field(min_length=8, max_length=40)
    new_password: str = Field(min_length=8, max_length=40)


# Database model, database table inferred from class name
class User(UserBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    hashed_password: str
    role: str = Field(default="User", max_length=50)
    first_name: str | None = Field(default=None, max_length=100)
    last_name: str | None = Field(default=None, max_length=100)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    items: list["Item"] = Relationship(back_populates="owner", cascade_delete=True)
    patients: list["Patient"] = Relationship(back_populates="created_by", cascade_delete=True)
    sessions: list["Session"] = Relationship(back_populates="user", cascade_delete=True)
    payments: list["Payment"] = Relationship(back_populates="user", cascade_delete=True)
    credit_transactions: list["CreditTransaction"] = Relationship(back_populates="user", cascade_delete=True)
    notifications: list["Notification"] = Relationship(back_populates="user", cascade_delete=True)


# Properties to return via API, id is always required
class UserPublic(UserBase):
    id: uuid.UUID


class UsersPublic(SQLModel):
    data: list[UserPublic]
    count: int


# Shared properties
class ItemBase(SQLModel):
    title: str = Field(min_length=1, max_length=255)
    description: str | None = Field(default=None, max_length=255)


# Properties to receive on item creation
class ItemCreate(ItemBase):
    pass


# Properties to receive on item update
class ItemUpdate(ItemBase):
    title: str | None = Field(default=None, min_length=1, max_length=255)  # type: ignore


# Database model, database table inferred from class name
class Item(ItemBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    owner_id: uuid.UUID = Field(
        foreign_key="user.id", nullable=False, ondelete="CASCADE"
    )
    owner: User | None = Relationship(back_populates="items")


# Properties to return via API, id is always required
class ItemPublic(ItemBase):
    id: uuid.UUID
    owner_id: uuid.UUID


class ItemsPublic(SQLModel):
    data: list[ItemPublic]
    count: int


# Generic message
class Message(SQLModel):
    message: str


# JSON payload containing access token
class Token(SQLModel):
    access_token: str
    token_type: str = "bearer"


# Contents of JWT token
class TokenPayload(SQLModel):
    sub: str | None = None


class NewPassword(SQLModel):
    token: str
    new_password: str = Field(min_length=8, max_length=40)


# Patient model
class Patient(SQLModel, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    name: str = Field(max_length=255)
    medical_history: str | None = None
    created_by_id: uuid.UUID = Field(foreign_key="user.id")
    created_by: User = Relationship(back_populates="patients")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    sessions: list["Session"] = Relationship(back_populates="patient")


# Session model
class Session(SQLModel, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    user_id: uuid.UUID = Field(foreign_key="user.id")
    patient_id: uuid.UUID = Field(foreign_key="patient.id")
    status: str = Field(max_length=50)  # 'scheduled', 'in_progress', 'completed', 'cancelled'
    scheduled_start_time: datetime | None = None
    start_time: datetime | None = None
    end_time: datetime | None = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    user: User = Relationship(back_populates="sessions")
    patient: Patient = Relationship(back_populates="sessions")
    conversation_logs: list["ConversationLog"] = Relationship(back_populates="session")
    feedback: "SessionFeedback" = Relationship(back_populates="session")


# ConversationLog model
class ConversationLog(SQLModel, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    session_id: uuid.UUID = Field(foreign_key="session.id")
    sender: str = Field(max_length=50)  # 'user', 'patient', 'feedback'
    message: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    session: Session = Relationship(back_populates="conversation_logs")


# Payment model
class Payment(SQLModel, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    user_id: uuid.UUID = Field(foreign_key="user.id")
    stripe_transaction_id: str = Field(max_length=255, unique=True)
    amount: Decimal = Field(max_digits=10, decimal_places=2)
    currency: str = Field(max_length=10)
    status: str = Field(max_length=50)  # 'pending', 'completed', 'refunded'
    created_at: datetime = Field(default_factory=datetime.utcnow)
    user: User = Relationship(back_populates="payments")


# CreditTransaction model
class CreditTransaction(SQLModel, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    user_id: uuid.UUID = Field(foreign_key="user.id")
    transaction_type: str = Field(max_length=50)  # 'purchase', 'usage', 'refund'
    credits: int
    description: str | None = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    user: User = Relationship(back_populates="credit_transactions")


# SessionFeedback model
class SessionFeedback(SQLModel, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    session_id: uuid.UUID = Field(foreign_key="session.id")
    user_rating: int = Field(ge=1, le=5)
    feedback_comment: str | None = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    session: Session = Relationship(back_populates="feedback")


# Notification model
class Notification(SQLModel, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    user_id: uuid.UUID = Field(foreign_key="user.id")
    type: str = Field(max_length=50)  # 'payment_update', 'onboarding', 'session_reminder'
    subject: str = Field(max_length=255)
    message: str
    status: str = Field(max_length=50)  # 'sent', 'pending'
    created_at: datetime = Field(default_factory=datetime.utcnow)
    user: User = Relationship(back_populates="notifications")
