# Solstice Events Check-In Kiosk

## Overview

Solstice Events Co. runs multi-day technology conferences and requires a kiosk application for attendee check-in.

Originally, the system used a synchronous badge-printing API where the kiosk waited for the printer vendor to confirm a badge was printed before marking an attendee as checked in.

During development, the badge-printing vendor deprecated the synchronous API and introduced an asynchronous architecture requiring:

* Message queue publishing

* Webhook callbacks

* Pending UI states

* Duplicate-scan protection

This project implements the new architecture using React, Express, PostgreSQL, Drizzle ORM, and RabbitMQ.

---

# Tech Stack

## Frontend

* React

* TypeScript

* Vite

* Tailwind CSS

* Axios

## Backend

* Node.js

* Express

* TypeScript

* Drizzle ORM

## Database

* PostgreSQL 16

## Messaging

* RabbitMQ

---

# Architecture

```text
React Frontend

       |

       v

Express API

       |

       v

RabbitMQ Queue

       |

       v

Printer Worker

       |

       v

Webhook Callback

       |

       v

PostgreSQL

       |

       v

Frontend Polling Updates
```

---

# Features

## Attendee Check-In

Staff can:

* Scan attendee QR codes

* Enter attendee QR codes manually

Example:

```text
ATT-001

ATT-002

ATT-003
```

---

## Duplicate Scan Protection

If an attendee has already checked in:

```text
ATT-001
```

and is scanned again:

```json
{
  "message": "Attendee already checked in"
}
```

No additional badge print request is created.

---

## Asynchronous Badge Printing

Instead of waiting for a printer response:

1. Check-in request received

2. Print job published to RabbitMQ

3. UI displays:

```text
PRINT_PENDING
```

4. Printer worker processes the job

5. Worker triggers webhook callback

6. Attendee status becomes:

```text
CHECKED_IN
```

---

# Database Schema

## attendees

| Column        | Type      |
| ------------- | --------- |
| id            | serial    |
| qr_code       | varchar   |
| full_name     | varchar   |
| status        | varchar   |
| checked_in_at | timestamp |

Status values:

```text
NOT_CHECKED_IN

PRINT_PENDING

CHECKED_IN
```

---

## print_jobs

Stores badge print requests.

| Column      | Type      |
| ----------- | --------- |
| id          | serial    |
| attendee_id | integer   |
| job_id      | varchar   |
| status      | varchar   |
| created_at  | timestamp |

---

## webhook_events

Stores webhook callback history.

| Column     | Type    |
| ---------- | ------- |
| id         | serial  |
| event_id   | varchar |
| event_type | varchar |
| payload    | text    |
| processed  | boolean |

---

# Setup

## Clone Repository

```bash
git clone <repository-url>

cd northstar-inventory
```

---

# Backend Setup

```bash
cd backend

npm install
```

Push database schema:

```bash
npm run db:push
```

Seed attendees:

```bash
npm run db:seed-attendees
```

Start backend:

```bash
npm run dev
```

---

# Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

# RabbitMQ Setup

Install RabbitMQ:

```bash
sudo apt install rabbitmq-server -y
```

Start service:

```bash
sudo systemctl enable rabbitmq-server

sudo systemctl start rabbitmq-server
```

Enable management dashboard:

```bash
sudo rabbitmq-plugins enable rabbitmq_management
```

Management UI:

```text
http://localhost:15672
```

Default credentials:

```text
guest

guest
```

---

# Running the System

## Terminal 1

Backend

```bash
npm run dev
```

## Terminal 2

Printer Worker

```bash
npm run printer:worker
```

## Terminal 3

Frontend

```bash
npm run dev
```

---

# Testing

## Generate QR Codes

Open:

```text
http://localhost:5173/qr-test
```

Available attendees:

```text
ATT-001

ATT-002

ATT-003
```

---

## Check-In Kiosk

Open:

```text
http://localhost:5173
```

---

## Test Flow

Scan:

```text
ATT-001
```

Expected:

```text
PRINT_PENDING

      ↓

CHECKED_IN
```

---

## Duplicate Scan Test

Scan:

```text
ATT-001
```

again.

Expected:

```text
Attendee already checked in
```

No second print request should be created.

---

# RabbitMQ Deployment Note

RabbitMQ and the Printer Worker were implemented and tested successfully in the local development environment. The asynchronous workflow, queue publishing, worker processing, webhook callbacks, and attendee status updates were fully verified locally.

The frontend and backend API are deployed separately, while RabbitMQ and the Printer Worker continue to run locally for demonstration purposes. This is because Render Background Workers require a paid plan and were not included in the deployment setup for this project.

The implemented architecture remains unchanged and can be deployed fully by hosting RabbitMQ and the Printer Worker on dedicated infrastructure or a managed RabbitMQ service.

---

# Pivot Summary

The original design relied on a synchronous badge-printing API.

The vendor introduced a breaking change requiring:

* Queue-based print requests

* Asynchronous processing

* Webhook callbacks

The system was successfully redesigned using RabbitMQ and webhooks while preserving duplicate-scan protection and accurate attendee check-in status.
