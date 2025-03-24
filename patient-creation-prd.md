# Product Requirements Document (PRD)

## Feature: Patient Creation

## 1. Overview
The **Patient Creation** feature enables **Super Users** to create and view **OpenAI/LLM AI-powered patient profiles** within the **Patients tab**. Each patient profile contains relevant **medical background information** that will be used during AI-powered consultations.

This feature will allow Super Users to efficiently **add new patients**, **view patient details**, and **manage existing profiles** to support the AI consultation platform.

---

## 2. Objectives
- Allow **Super Users** to create AI-powered **patient profiles**.
- Store **medical background details** for each patient.
- Provide an interface to **view** and **manage** patient profiles.
- Ensure **data security** and **role-based access control** (only Super Users can create/view patients).

---

## 3. User Stories
### Super User:
1. As a **Super User**, I want to **create a new AI/LL powered patient profile** by providing their name and medical background, so that I can use them for AI consultations.
2. As a **Super User**, I want to **view a list of all AI-powered patient profiles** in the **Patients tab**, so that I can manage/update existing records.
3. As a **Super User**, I want to **see patient details** when I click on a specific profile, so that I can review medical history.

---

## 4. Scope
### IN SCOPE:
✅ **Patient Creation:** Super Users can **create new patient profiles** with a name and medical background.  
✅ **Patient Viewing:** Super Users can **view a list of all created patient profiles**.  
✅ **Patient Details:** Clicking a patient in the list opens a **detailed view** showing their medical history.  
✅ **Role-Based Access:** Only **Super Users** can **create and view** patients.  

### OUT OF SCOPE:
❌ **Patient Editing/Deletion:** This version does **not** include the ability to **edit** or **delete** patient profiles.  
❌ **AI-generated Medical Data:** Medical history will be **manually entered**, not AI-generated.  

---

## 5. Functional Requirements

### 5.1 Patient Creation
**Flow:**
1. **Super User logs in** to the platform.
2. Navigates to the **Patients tab**.
3. Clicks **“Create Patient”** button.
4. Fills out the **Patient Name** and **Medical Background** fields.
5. Clicks **“Save”** to create the patient.
6. The system **stores the patient record** in the database.

**UI Elements:**
- "Create Patient" Button
- Patient Form (Name, Medical Background)
- "Save" Button

**Validation Rules:**
- **Patient Name:** Required, max **255 characters**
- **Medical Background:** Required, max **5000 characters**

### 5.2 Patient Viewing
**Flow:**
1. **Super User logs in** and navigates to the **Patients tab**.
2. Sees a **list of all created patients**, displaying:
   - Patient Name
   - Date Created
3. Clicks on a patient to **view details**.

### 5.3 Patient Update
**Flow:**
1. **Super User logs in** and navigates to the **Patients tab**.
2. Sees a **list of all created patients**, displaying:
   - Patient Name
   - Date Created
3. Clicks on a patient to **update details**.
4. Updates the patient's **Medical Background** field.
5. Clicks **“Save”** to update the patient's medical background details.
6. The system **stores the updated patient record** in the database.

**UI Elements:**
- Patient List (Table)
- Patient Detail View (Modal or New Page)

### 5.4 Role-Based Access Control (RBAC)
- **Super Users** ✅ can **create** and **view** patients.
- **Regular Users** ❌ **cannot** access the Patients tab.

---

## 6. Technical Requirements

### 6.1 API Endpoints
| Method | Endpoint        | Description          | Access             |
|---------|----------------|----------------------|--------------------|
| POST    | /patients      | Create new patient   | Super Users        |
| GET     | /patients      | Get list of patients | Super Users        |
| GET     | /patients/{id} | Get patient details  | Super Users        |


### 6.2 Frontend Changes
- Patients Tab: List patients.
- Create Patient Form: Input fields for name & medical history.
- Patient Detail View: Shows patient information.

### 6.3 Security & Compliance
- RBAC Enforcement: Only Super Users can access endpoints.

## 7. Scope
### Success Metrics:
✅ **Patient Creation:** Super Users can create patients successfully.  
✅ **Patient Viewing:** All patients are displayed in the Patients tab.
✅ **RBAC:** Only authorized users (Super Users) can create/view patients.

## 8. Conclusion
This feature empowers Super Users to manage AI-powered patient profiles. It ensures secure access, structured patient data, and supports AI consultations.