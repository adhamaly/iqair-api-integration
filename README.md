# **Air Quality Monitoring API**

## **Overview**

A scalable backend application built with **NestJS**, **MongoDB**, and **RabbitMQ** for real-time air quality monitoring.  
The system fetches air quality data from the **IQAir API**, stores it in MongoDB, and provides APIs for retrieving real-time and historical pollution data.  
It supports **cron jobs** for scheduled data fetching and a **most polluted time finder**.

---

## **Features**

- **Air Quality API Integration:** Fetch air quality data for any location using latitude & longitude.
- **Paris Zone Monitoring:** CRON job fetches Paris air quality every minute and stores results in MongoDB.
- **Most Polluted Time:** Endpoint to get the datetime when Paris had the worst air quality.
- **GeoJSON Support:** Store locations as `Point` type for advanced geospatial queries.
- **Microservices Architecture:** Separate services for API and CRON jobs connected via RabbitMQ.
- **API Documentation:** Automatically generated API documentation using Swagger.
- **Containerization:** Ready-to-use Docker setup for API, MongoDB, and RabbitMQ.

---

## **Tech Stack**

- **Backend Framework:** NestJS (Monorepo Mode)
- **Database:** MongoDB (Mongoose)
- **Message Broker:** RabbitMQ (`@golevelup/nestjs-rabbitmq`)
- **API Integration:** IQAir API
- **Scheduling:** `@nestjs/schedule` (CRON jobs)
- **API Documentation:** Swagger (`@nestjs/swagger`)
- **Containerization:** Docker & Docker Compose
- **Testing:** Jest

---

## **Setup**

### **Prerequisites**

Before starting, ensure you have the following installed:

- **Node.js** (>= 18.x)
- **Docker** and **Docker Compose** (for containerization)
- **MongoDB**
- **RabbitMQ**

---

### **Step 1: Clone the Repository**

```bash
git clone https://github.com/adhamaly/iqair-api-integration.git
cd iqair-api-integration
```

---

### **Step 2: Install Dependencies**

```bash
npm install
```

---

### **Step 3: Configure Environment Variables**

Create a `.env` file in the root directory by copying the example:

```bash
cp .env.example .env
```

#### Example `.env`:

```env

# MongoDB
MONGODB_URI=mongodb://mongo:27017/air-quality

# RabbitMQ
RABBITMQ_URI=amqp://rabbitmq:5672

# IQAir API Key
IQAIR_API_KEY=your_api_key_here

# Paris Zone Coordinates
PARIS_ZONE_LAT=48.856613
PARIS_ZONE_LNG=2.352222
```

---

### **Step 4: Running the Application**

#### Local Development

```bash
npm run start:dev air-quality-api
npm run start:dev air-quality-cron
```

#### Using Docker

```bash
docker-compose up --build
```

The app will be available at:

- API: [http://localhost:3000](http://localhost:3000)
- Swagger Docs: [http://localhost:3000/iqair-quality/docs](http://localhost:3000/iqair-quality/docs)

---

### **Step 5: API Documentation**

Swagger documentation is auto-generated and available at:

```
http://localhost:3000/iqair-quality/docs
```

---

## **Key Endpoints**

| Method | Endpoint                                     | Description                              |
| ------ | -------------------------------------------- | ---------------------------------------- |
| `GET`  | `/air-qualities/nearest?lat={lat}&lng={lng}` | Get air quality for specific coordinates |
| `GET`  | `/air-qualities/most-polluted`               | Get datetime when Paris had worst AQI    |

---

## **Docker Services**

| Service           | Description                                          |
| ----------------- | ---------------------------------------------------- |
| `air-quality-api` | Main API application                                 |
| `cron`            | Cron service fetching Paris air quality every minute |
| `mongo`           | MongoDB database                                     |
| `rabbitmq`        | RabbitMQ message broker                              |
