# Database Design and Schema

This document outlines the database design and schema to support the AI-powered patient consultation platform. The design covers user management, patient catalog, session management, payment processing, conversation logging, feedback collection, and notifications.

---

## 1. Entity Relationship Overview

### Primary Entities:
- **Users:** Represents student dietitians and administrative users.
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

## 2. Database Tables and Schema

### 2.1 Users Table
Stores registered users with role-based access.

| Column         | Data Type         | Details                                  |
|----------------|-------------------|------------------------------------------|
| id             | SERIAL PRIMARY KEY| Unique user identifier                   |
| first_name     | VARCHAR(100)      | User's first name                        |
| last_name      | VARCHAR(100)      | User's last name                         |
| email          | VARCHAR(255)      | Unique email address                     |
| password_hash  | VARCHAR(255)      | Hashed password                          |
| role           | VARCHAR(50)       | Role e.g., 'SuperAdmin', 'Admin', 'User'   |
| created_at     | TIMESTAMP         | Default: CURRENT_TIMESTAMP               |
| updated_at     | TIMESTAMP         | Default: CURRENT_TIMESTAMP               |

### 2.2 Patients Table
Holds information about AI-powered patients and their medical background.

| Column         | Data Type         | Details                                  |
|----------------|-------------------|------------------------------------------|
| id             | SERIAL PRIMARY KEY| Unique patient identifier                |
| name           | VARCHAR(255)      | Patient name or identifier               |
| medical_history| TEXT              | Predefined medical background context    |
| created_by     | INT               | Foreign key referencing Users(id)        |
| created_at     | TIMESTAMP         | Default: CURRENT_TIMESTAMP               |
| updated_at     | TIMESTAMP         | Default: CURRENT_TIMESTAMP               |

### 2.3 Sessions Table
Tracks consultation sessions booked by users.

| Column                | Data Type         | Details                                            |
|-----------------------|-------------------|----------------------------------------------------|
| id                    | SERIAL PRIMARY KEY| Unique session identifier                          |
| user_id               | INT               | Foreign key referencing Users(id)                  |
| patient_id            | INT               | Foreign key referencing Patients(id)               |
| status                | VARCHAR(50)       | e.g., 'scheduled', 'in_progress', 'completed', 'cancelled' |
| scheduled_start_time  | TIMESTAMP         | Scheduled start time for the session               |
| start_time            | TIMESTAMP         | Actual start time of the session                 |
| end_time              | TIMESTAMP         | Session end time                                   |
| created_at            | TIMESTAMP         | Default: CURRENT_TIMESTAMP                         |
| updated_at            | TIMESTAMP         | Default: CURRENT_TIMESTAMP                         |

### 2.4 ConversationLogs Table
Stores the messages exchanged during each session.

| Column      | Data Type         | Details                                    |
|-------------|-------------------|--------------------------------------------|
| id          | SERIAL PRIMARY KEY| Unique log entry identifier                |
| session_id  | INT               | Foreign key referencing Sessions(id)       |
| sender      | VARCHAR(50)       | Identifier for the sender ('user', 'patient', 'feedback') |
| message     | TEXT              | The message content                        |
| created_at  | TIMESTAMP         | Default: CURRENT_TIMESTAMP                 |

### 2.5 Payments Table
Records financial transactions for session credits via Stripe.

| Column                 | Data Type         | Details                                            |
|------------------------|-------------------|----------------------------------------------------|
| id                     | SERIAL PRIMARY KEY| Unique payment identifier                          |
| user_id                | INT               | Foreign key referencing Users(id)                  |
| stripe_transaction_id  | VARCHAR(255)      | Unique transaction ID from Stripe                |
| amount                 | DECIMAL(10,2)     | Transaction amount                                 |
| currency               | VARCHAR(10)       | Currency code (e.g., USD)                          |
| status                 | VARCHAR(50)       | e.g., 'pending', 'completed', 'refunded'           |
| created_at             | TIMESTAMP         | Default: CURRENT_TIMESTAMP                         |

### 2.6 CreditTransactions Table
Maintains a record of credit purchase and usage events.

| Column           | Data Type         | Details                                            |
|------------------|-------------------|----------------------------------------------------|
| id               | SERIAL PRIMARY KEY| Unique transaction record                          |
| user_id          | INT               | Foreign key referencing Users(id)                  |
| transaction_type | VARCHAR(50)       | e.g., 'purchase', 'usage', 'refund'                |
| credits          | INT               | Number of credits added or used                    |
| description      | TEXT              | Description or notes regarding the transaction     |
| created_at       | TIMESTAMP         | Default: CURRENT_TIMESTAMP                         |

### 2.7 SessionFeedback Table
Holds user feedback and ratings for each consultation session.

| Column          | Data Type         | Details                                     |
|-----------------|-------------------|---------------------------------------------|
| id              | SERIAL PRIMARY KEY| Unique feedback identifier                  |
| session_id      | INT               | Foreign key referencing Sessions(id)        |
| user_rating     | INT               | Numerical rating (e.g., 1 to 5) with CHECK constraint |
| feedback_comment| TEXT              | Textual feedback/comments                   |
| created_at      | TIMESTAMP         | Default: CURRENT_TIMESTAMP                  |

### 2.8 Notifications Table
Manages email notifications sent to users.

| Column   | Data Type         | Details                                         |
|----------|-------------------|-------------------------------------------------|
| id       | SERIAL PRIMARY KEY| Unique notification identifier                   |
| user_id  | INT               | Foreign key referencing Users(id)               |
| type     | VARCHAR(50)       | Notification type e.g., 'payment_update', 'onboarding', 'session_reminder' |
| subject  | VARCHAR(255)      | Email subject line                              |
| message  | TEXT              | Email message content                           |
| status   | VARCHAR(50)       | e.g., 'sent', 'pending'                         |
| created_at | TIMESTAMP       | Default: CURRENT_TIMESTAMP                      |

---

## 3. SQL Schema Example

Below is an example SQL schema to create the tables described above:

```sql
-- Users Table
CREATE TABLE Users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL, -- e.g., 'SuperAdmin', 'Admin', 'User'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Patients Table
CREATE TABLE Patients (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  medical_history TEXT,
  created_by INT REFERENCES Users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sessions Table
CREATE TABLE Sessions (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES Users(id),
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
  id SERIAL PRIMARY KEY,
  session_id INT REFERENCES Sessions(id),
  sender VARCHAR(50) NOT NULL, -- 'user', 'patient', 'feedback'
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payments Table
CREATE TABLE Payments (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES Users(id),
  stripe_transaction_id VARCHAR(255) UNIQUE NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(10) NOT NULL,
  status VARCHAR(50) NOT NULL, -- e.g., 'pending', 'completed', 'refunded'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Credit Transactions Table
CREATE TABLE CreditTransactions (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES Users(id),
  transaction_type VARCHAR(50) NOT NULL, -- 'purchase', 'usage', 'refund'
  credits INT NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Session Feedback Table
CREATE TABLE SessionFeedback (
  id SERIAL PRIMARY KEY,
  session_id INT REFERENCES Sessions(id),
  user_rating INT CHECK (user_rating BETWEEN 1 AND 5),
  feedback_comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Notifications Table
CREATE TABLE Notifications (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES Users(id),
  type VARCHAR(50) NOT NULL, -- e.g., 'payment_update', 'onboarding', 'session_reminder'
  subject VARCHAR(255),
  message TEXT,
  status VARCHAR(50) NOT NULL, -- e.g., 'sent', 'pending'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
