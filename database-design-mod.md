# Database Design and Schema

This document outlines the database design and schema to support the AI-powered patient consultation platform. The design covers user management, patient catalog, session management, payment processing, conversation logging, feedback collection, and notifications.

---

## 1. Entity Relationship Overview

### Primary Entities:
- **User:** Represents student dietitians and administrative users.
- **Patients:** Represents AI-powered patient profiles with predefined medical backgrounds.
- **Sessions:** Consultation sessions between users and AI patients.
- **ConversationLogs:** Logs all messages exchanged during a session.
- **Payments:** Records of financial transactions for session credits.
- **CreditTransactions:** Tracks credit purchase and usage history.
- **SessionFeedback:** Stores feedback and ratings from completed sessions.
- **Notifications:** Manages email notifications for various system events.

### Relationships:
- A **User** can book multiple **Sessions**.
- Each **Session** is associated with one **Patient**.
- A **Session** will have multiple **ConversationLogs**.
- A **Session** has one associated **SessionFeedback** record.
- A **User** can have multiple **Payments** and **CreditTransactions**.
- A **User** can receive multiple **Notifications**.

---

## 3. SQL Schema

Below is the SQL schema to create the tables described above:

```sql
-- Users Table
-- 1) Update user table to include a 'role' column
ALTER TABLE "user"
ADD COLUMN IF NOT EXISTS role VARCHAR(50) DEFAULT 'User';
ADD COLUMN IF NOT EXISTS first_name VARCHAR(100) DEFAULT NULL;
ADD COLUMN IF NOT EXISTS last_name VARCHAR(100) DEFAULT NULL;
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

-- Patients Table
CREATE TABLE Patients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  medical_history TEXT,
  created_by INT REFERENCES "user"(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sessions Table
CREATE TABLE Sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id INT REFERENCES "user"(id),
  patient_id INT REFERENCES Patients(id),
  status VARCHAR(50) NOT NULL, -- e.g., 'scheduled', 'in_progress', 'completed', 'cancelled'
  scheduled_start_time TIMESTAMP,
  start_time TIMESTAMP,
  end_time TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Conversation Logs Table
CREATE TABLE ConversationLogs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id INT REFERENCES Sessions(id),
  sender VARCHAR(50) NOT NULL, -- 'user', 'patient', 'feedback'
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payments Table
CREATE TABLE Payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id INT REFERENCES "user"(id),
  stripe_transaction_id VARCHAR(255) UNIQUE NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(10) NOT NULL,
  status VARCHAR(50) NOT NULL, -- e.g., 'pending', 'completed', 'refunded'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Credit Transactions Table
CREATE TABLE CreditTransactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id INT REFERENCES "user"(id),
  transaction_type VARCHAR(50) NOT NULL, -- 'purchase', 'usage', 'refund'
  credits INT NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Session Feedback Table
CREATE TABLE SessionFeedback (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id INT REFERENCES Sessions(id),
  user_rating INT CHECK (user_rating BETWEEN 1 AND 5),
  feedback_comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Notifications Table
CREATE TABLE Notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id INT REFERENCES "user"(id),
  type VARCHAR(50) NOT NULL, -- e.g., 'payment_update', 'onboarding', 'session_reminder'
  subject VARCHAR(255),
  message TEXT,
  status VARCHAR(50) NOT NULL, -- e.g., 'sent', 'pending'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

##

 ┌────────────────────┐          ┌───────────────────────┐
 │     user           │          │       patients        │
 │ ───────────────────│          │───────────────────────│
 │ id (UUID) PK       │   1 : M  │ id (UUID) PK          │
 │ email              │──────────│ created_by -> user.id │
 │ hashed_password    │          │ ...                   │
 │ role               │          └───────────────────────┘
 └────────────────────┘
           │
           │ 1 : M
           │
 ┌────────────────────┐          ┌─────────────────────────┐
 │    sessions        │          │   conversation_logs     │
 │────────────────────│   1 : M  │─────────────────────────│
 │ id (UUID) PK       │──────────│ id (UUID) PK            │
 │ user_id -> user.id │          │ session_id -> sessions.id
 │ patient_id -> patients.id     │ ...                     │
 │ ...                │          └─────────────────────────┘
 └────────────────────┘

 ┌──────────────────────┐
 │     payments         │
 │──────────────────────│
 │ id (UUID) PK         │
 │ user_id -> user.id   │
 │ ...                  │
 └──────────────────────┘

 ┌────────────────────────┐
 │   credit_transactions  │
 │────────────────────────│
 │ id (UUID) PK           │
 │ user_id -> user.id     │
 │ ...                    │
 └────────────────────────┘

 ┌──────────────────────┐
 │  session_feedback    │
 │──────────────────────│
 │ id (UUID) PK         │
 │ session_id -> sessions.id
 │ ...                  │
 └──────────────────────┘

 ┌──────────────────────┐
 │    notifications     │
 │──────────────────────│
 │ id (UUID) PK         │
 │ user_id -> user.id   │
 │ ...                  │
 └──────────────────────┘