Gotham Criminal Registry 
A full-stack web application built as part of a DevOps project, demonstrating CI/CD pipelines, containerization with Docker, and cloud deployment on AWS.


Project Overview
Gotham Criminal Registry is a three-tier web application for tracking and managing criminals. The application is split across three repositories — frontend, backend, and database — each independently containerized and deployed through an automated CI/CD pipeline.

Modules

Criminal Registry — Add criminals, view them on a dashboard, and terminate them
Case Files — Link cases and crimes to individual criminals, open and close cases
Wanted Board — Assign and view threat levels (low / medium / high) with visual indicators
Sightings — Log and track where criminals were last spotted with location and timestamp
Gotham Crime Log — A live timestamped activity feed of all actions across the application

User Stories for BATCOM Criminal Surveillance System
-Target Management
As a surveillance officer, I want to add new criminal targets with their real name, alias, threat level, and case details, so that I can maintain an up-to-date database of persons of interest.
As a surveillance officer, I want to update a target's threat level (High/Medium/Low), so that resources can be allocated appropriately based on current risk assessment.
As a field operative, I want to mark a target as "Captured" or release them, so that the system reflects current custody status.
As a senior operative, I want to terminate a target from surveillance, so that the system distinguishes between active and closed cases.
-Wanted Board
As a field operative, I want to search the wanted board by name or alias, so that I can quickly identify targets during patrol.
As a surveillance officer, I want to view complete case details for each target, so that I understand the context of their criminal activity.
As a field operative, I want to see how many sightings each target has and their last known location, so that I can focus surveillance efforts effectively.
-Surveillance Operations
As a field operative, I want to log sightings with location, date, and notes, so that movement patterns can be tracked over time.
As a surveillance officer, I want to filter sightings by date, so that I can review activity on specific days.
As a surveillance officer, I want to search sightings by target name/alias, so that I can review all activity for a specific individual.
-Crime Log & Intelligence
As a intelligence officer, I want to manually add custom log entries so that important events are documented.
As a surveillance officer, I want to filter crime logs by date, so that I can review events from specific time periods.
As a analyst, I want to view all system-generated and manual log entries, so that I can audit changes and track system activity.
Statistics & Reporting
-As a commander, I want to view real-time statistics on total targets, threat distribution, captured, and terminated counts, so that I can assess overall operational status.
As a administrator, I want to see system status (BAT-SIGNAL, DATABASE, ARKHAM monitoring), so that I can ensure all systems are operational.
-Data Persistence
As a surveillance officer, I want to all changes (new targets, sightings, status updates) to persist to the backend, so that data is not lost between sessions.
As a user, I want to the system to auto-refresh data every 3 seconds, so that I always see the most current information.
