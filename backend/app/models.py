import uuid
from datetime import datetime
from enum import Enum as PyEnum
from typing import List, Optional

from pydantic import EmailStr, Field
from sqlmodel import Field, Relationship, SQLModel


# Make sure to place this enum definition BEFORE any classes that use it
class UserRole(str, PyEnum):
    SUPER_ADMIN = "SuperAdmin"
    ADMIN = "Admin"
    USER = "User"


# Shared properties
class UserBase(SQLModel):
    email: EmailStr = Field(unique=True, index=True, max_length=255)
    is_active: bool = True
    is_superuser: bool = False
    full_name: str | None = Field(default=None, max_length=255)


# Properties to receive via API on creation
class UserCreate(SQLModel):
    email: EmailStr
    password: str
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    full_name: Optional[str] = None
    is_active: Optional[bool] = True
    is_superuser: Optional[bool] = False
    role: Optional[UserRole] = UserRole.USER


class UserRegister(SQLModel):
    email: EmailStr = Field(max_length=255)
    password: str = Field(min_length=8, max_length=40)
    full_name: str | None = Field(default=None, max_length=255)


# Properties to receive via API on update, all are optional
class UserUpdate(SQLModel):
    email: Optional[EmailStr] = None
    password: Optional[str] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    full_name: Optional[str] = None
    is_active: Optional[bool] = None
    is_superuser: Optional[bool] = None
    role: Optional[UserRole] = None


class UserUpdateMe(SQLModel):
    full_name: str | None = Field(default=None, max_length=255)
    email: EmailStr | None = Field(default=None, max_length=255)


class UpdatePassword(SQLModel):
    current_password: str = Field(min_length=8, max_length=40)
    new_password: str = Field(min_length=8, max_length=40)


# Database model, database table inferred from class name
class User(UserBase, table=True):
    id: uuid.UUID = Field(
        default_factory=uuid.uuid4,
        primary_key=True,
        index=True,
        nullable=False,
    )
    email: EmailStr = Field(max_length=255, unique=True, index=True)
    first_name: Optional[str] = Field(max_length=100, nullable=True)
    last_name: Optional[str] = Field(max_length=100, nullable=True)
    full_name: Optional[str] = Field(max_length=255, nullable=True)  # Keep for backward compatibility
    hashed_password: str = Field(max_length=255)
    is_active: bool = True
    is_superuser: bool = False
    role: UserRole = Field(default=UserRole.USER)
    credits_balance: int = Field(default=0)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Relationships
    items: List["Item"] = Relationship(back_populates="owner", sa_relationship_kwargs={"cascade": "all, delete-orphan"})
    created_patients: List["Patient"] = Relationship(back_populates="creator", sa_relationship_kwargs={"cascade": "all, delete-orphan"})
    sessions: List["Session"] = Relationship(back_populates="user", sa_relationship_kwargs={"cascade": "all, delete-orphan"})
    payments: List["Payment"] = Relationship(back_populates="user", sa_relationship_kwargs={"cascade": "all, delete-orphan"})
    credit_transactions: List["CreditTransaction"] = Relationship(back_populates="user", sa_relationship_kwargs={"cascade": "all, delete-orphan"})
    notifications: List["Notification"] = Relationship(back_populates="user", sa_relationship_kwargs={"cascade": "all, delete-orphan"})


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
    title: str = Field(max_length=255)
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


# New Enum classes for status fields
class SessionStatus(str, PyEnum):
    SCHEDULED = "scheduled"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    CANCELLED = "cancelled"

class PaymentStatus(str, PyEnum):
    PENDING = "pending"
    COMPLETED = "completed"
    REFUNDED = "refunded"

class NotificationStatus(str, PyEnum):
    SENT = "sent"
    PENDING = "pending"

class TransactionType(str, PyEnum):
    PURCHASE = "purchase"
    USAGE = "usage"
    REFUND = "refund"

class MessageSender(str, PyEnum):
    USER = "user"
    PATIENT = "patient"
    FEEDBACK = "feedback"

# Patient Model
class PatientBase(SQLModel):
    name: str = Field(max_length=255)
    medical_history: str

class Patient(PatientBase, table=True):
    __tablename__ = "patients"
    
    id: uuid.UUID = Field(
        default_factory=uuid.uuid4,
        primary_key=True,
        index=True,
        nullable=False,
    )
    created_by: uuid.UUID = Field(foreign_key="user.id")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Relationships
    creator: "User" = Relationship(back_populates="created_patients")
    sessions: List["Session"] = Relationship(back_populates="patient")

# Session Model
class SessionBase(SQLModel):
    status: SessionStatus = Field(default=SessionStatus.SCHEDULED)
    scheduled_start_time: Optional[datetime] = None

class Session(SessionBase, table=True):
    __tablename__ = "sessions"
    
    id: uuid.UUID = Field(
        default_factory=uuid.uuid4,
        primary_key=True,
        index=True,
        nullable=False,
    )
    user_id: uuid.UUID = Field(foreign_key="user.id", nullable=False)
    patient_id: uuid.UUID = Field(foreign_key="patients.id", nullable=False)
    start_time: Optional[datetime] = None
    end_time: Optional[datetime] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Relationships
    user: "User" = Relationship(back_populates="sessions")
    patient: Patient = Relationship(back_populates="sessions")
    conversation_logs: List["ConversationLog"] = Relationship(back_populates="session")
    feedback: Optional["SessionFeedback"] = Relationship(back_populates="session")

# ConversationLog Model
class ConversationLogBase(SQLModel):
    sender: MessageSender
    message: str

class ConversationLog(ConversationLogBase, table=True):
    __tablename__ = "conversation_logs"
    
    id: uuid.UUID = Field(
        default_factory=uuid.uuid4,
        primary_key=True,
        index=True,
        nullable=False,
    )
    session_id: uuid.UUID = Field(foreign_key="sessions.id", nullable=False)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Relationships
    session: Session = Relationship(back_populates="conversation_logs")

# Payment Model
class PaymentBase(SQLModel):
    amount: float = Field(..., ge=0)
    currency: str = Field(max_length=10)
    status: PaymentStatus = Field(default=PaymentStatus.PENDING)

class Payment(PaymentBase, table=True):
    __tablename__ = "payments"
    
    id: uuid.UUID = Field(
        default_factory=uuid.uuid4,
        primary_key=True,
        index=True,
        nullable=False,
    )
    user_id: uuid.UUID = Field(foreign_key="user.id", nullable=False)
    stripe_transaction_id: str = Field(max_length=255, unique=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Relationships
    user: "User" = Relationship(back_populates="payments")

# CreditTransaction Model
class CreditTransactionBase(SQLModel):
    transaction_type: TransactionType
    credits: int = Field(..., ge=0)
    description: Optional[str] = None

class CreditTransaction(CreditTransactionBase, table=True):
    __tablename__ = "credit_transactions"
    
    id: uuid.UUID = Field(
        default_factory=uuid.uuid4,
        primary_key=True,
        index=True,
        nullable=False,
    )
    user_id: uuid.UUID = Field(foreign_key="user.id", nullable=False)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Relationships
    user: "User" = Relationship(back_populates="credit_transactions")

# SessionFeedback Model
class SessionFeedbackBase(SQLModel):
    user_rating: Optional[int] = Field(None, ge=1, le=5)
    feedback_comment: Optional[str] = None

class SessionFeedback(SessionFeedbackBase, table=True):
    __tablename__ = "session_feedback"
    
    id: uuid.UUID = Field(
        default_factory=uuid.uuid4,
        primary_key=True,
        index=True,
        nullable=False,
    )
    session_id: uuid.UUID = Field(foreign_key="sessions.id", nullable=False, unique=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Relationships
    session: Session = Relationship(back_populates="feedback")

# Notification Model
class NotificationBase(SQLModel):
    type: str = Field(max_length=50)
    subject: Optional[str] = Field(None, max_length=255)
    message: Optional[str] = None
    status: NotificationStatus = Field(default=NotificationStatus.PENDING)

class Notification(NotificationBase, table=True):
    __tablename__ = "notifications"
    
    id: uuid.UUID = Field(
        default_factory=uuid.uuid4,
        primary_key=True,
        index=True,
        nullable=False,
    )
    user_id: uuid.UUID = Field(foreign_key="user.id", nullable=False)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Relationships
    user: "User" = Relationship(back_populates="notifications")

# Add new schemas for API responses
class PatientCreate(PatientBase):
    pass

class PatientUpdate(SQLModel):
    name: Optional[str] = None
    medical_history: Optional[str] = None

class PatientPublic(PatientBase):
    id: uuid.UUID
    created_at: datetime
    created_by: uuid.UUID

class PatientsPublic(SQLModel):
    data: List[PatientPublic]
    count: int

class SessionCreate(SessionBase):
    patient_id: uuid.UUID
    scheduled_start_time: datetime

class SessionUpdate(SQLModel):
    status: Optional[SessionStatus] = None
    scheduled_start_time: Optional[datetime] = None
    start_time: Optional[datetime] = None
    end_time: Optional[datetime] = None

class SessionPublic(SessionBase):
    id: uuid.UUID
    user_id: uuid.UUID
    patient_id: uuid.UUID
    start_time: Optional[datetime]
    end_time: Optional[datetime]
    created_at: datetime

class SessionsPublic(SQLModel):
    data: List[SessionPublic]
    count: int

class ConversationLogCreate(ConversationLogBase):
    session_id: uuid.UUID

class ConversationLogPublic(ConversationLogBase):
    id: uuid.UUID
    session_id: uuid.UUID
    created_at: datetime

class SessionFeedbackCreate(SessionFeedbackBase):
    session_id: uuid.UUID

class SessionFeedbackPublic(SessionFeedbackBase):
    id: uuid.UUID
    session_id: uuid.UUID
    created_at: datetime

class PaymentCreate(PaymentBase):
    stripe_transaction_id: str

class PaymentPublic(PaymentBase):
    id: uuid.UUID
    user_id: uuid.UUID
    stripe_transaction_id: str
    created_at: datetime

class CreditTransactionCreate(CreditTransactionBase):
    pass

class CreditTransactionPublic(CreditTransactionBase):
    id: uuid.UUID
    user_id: uuid.UUID
    created_at: datetime

class NotificationCreate(NotificationBase):
    user_id: uuid.UUID

class NotificationPublic(NotificationBase):
    id: uuid.UUID
    user_id: uuid.UUID
    created_at: datetime
