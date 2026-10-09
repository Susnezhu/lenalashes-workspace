# LenaLashes Workspace - Project Plan

## 1. Project Overview

LenaLashes Workspace is a private internal management app for LenaLashes beauty salon.

Salon already uses different systems for customer services: Timma, Sumup, online store, website. So the purpose of this project is not replace these systems, instead make application for internal salon management.

The application will be designed specifically for smartphone use because employees do not have computers at the salon and application should be fast and easy to use in daily work.

## 2. Goals

### Important goals

* Centralize internal salon information.
* Reduce manual work for the owner.
* Easy history checking.
* Make the inventory easier and faster to update.
* Make employee tasks and announcements visible in one place.
* Organize weekly cleaning responsibilities.
* Provide a simple manual bonus system.
* Create a mobile experience suitable for both iPhone and Android
* Make language settings for multilanguage team

### Secondary goals
* Keep the interface simple for a small team.
* Make important pending actions difficult to overlook.
* Keep the first version focused and maintainable.
* Leave room for future paid development and additional features.

## 3. Target Users

### Administrator

The administrator is the salon owner.

The administrator can manage employees, cleaning schedules, announcements, tasks, inventory, bonuses and gifts.

### Employee

Employees use the application for daily internal communication and tasks.

Employees can view their own information, complete tasks, use the cleaning checklist, update inventory information when required and use bonus points for gifts.

## 4. Main Features

The application includes:

* Employee management
* Cleaning management
* Tasks and announcements
* Inventory management
* Employee bonuses and gift shop
* Finnish, english and russian languages

See [Features](docs/features.md) for more details.


## 5. Tech Stack

### Frontend

* React
* TypeScript
* Vite
* MUI
* PWA

### Backend

* Node.js
* Express
* TypeScript
* REST API

### Database

* PostgreSQL
* Sequelize
* Neon

## 6. Platform

LenaLashes Workspace is a mobile Progressive Web App (PWA).

The application is designed primarily for smartphones and supports both iOS and Android devices.

Employees access the application through a web browser and can add it to their device home screen as a PWA.

## 7. Development Plan

1. Project plan and docs - done
2. Project setup - done
3. Database and backend - in progress
4. Authentication and user roles
5. Main UI and navigation
6. Core features
7. Testing and bug fixing
8. Deployment


## 8. Testing

Testing will be using GitHub workflows.

The application will be tested in few areas:

- Backend functionality
- API testing
- Frontend component and functionality testing
- Authentication and authorization testing
- Responsive testing on iPhone and Android
- Error handling testing

## 9. Deployment

The deployment method will be chosen later.

The application will be deployed as a private Progressive Web App and access will be restricted to authorized LenaLashes users.

## 10. Future Development

Potential future features and improvements will be added to this section. Here will be new needs and ideas.