# SysML Diagrams - Online Learning Progress Tracker

This folder contains the SysML (Systems Modeling Language) diagrams for the Online Learning Progress Tracker project. These diagrams provide different perspectives on the system architecture, requirements, and constraints.

## 📋 Requirements Diagram (`requirements-diagram.puml`)

**Purpose**: Models the functional and non-functional requirements along with stakeholder needs.

**Key Elements**:
- **Stakeholders**: Students, Instructors, Administrators, System Administrators
- **Functional Requirements**: 
  - User Management (FR001)
  - Course Management (FR002)
  - Course Enrollment (FR003)
  - Progress Tracking (FR004)
  - Task Management (FR005)
  - Analytics Dashboard (FR006)
  - Achievement System (FR007)
  - Learning Streaks (FR008)
  - Bookmarking System (FR009)
  - Goal Setting (FR010)
- **Non-Functional Requirements**:
  - Security (NFR001)
  - Performance (NFR002)
  - Scalability (NFR003)
  - Usability (NFR004)
  - Reliability (NFR005)
  - Data Integrity (NFR006)
- **System Requirements**: API Integration, Database Management, Frontend Framework

## 🏗️ Block Definition Diagram (`block-definition-diagram.puml`)

**Purpose**: Defines the structural elements of the system and their relationships.

**Key Blocks**:
- **System Architecture**: Main system blocks (Frontend, Backend, Database)
- **Frontend Components**: UI Layer, Authentication Pages, Dashboard, Course Components, Task Components
- **Backend Services**: Authentication Service, Course Management, Progress Tracking, Task Management, Middleware
- **Data Models**: User, Course, Learning Progress, Task models with properties and operations
- **External Systems**: Certificate Authority, Notification Service

**Relationships**: Shows composition, dependency, and communication relationships between blocks.

## 📐 Parametric Diagram (`parametric-diagram.puml`)

**Purpose**: Models mathematical relationships, constraints, and equations that govern system behavior.

**Key Constraint Packages**:

### Progress Calculation Constraints
- **Course Completion**: `completionPercentage = (modulesCompleted / totalModules) * 100`
- **Time Tracking**: `totalTimeSpent = sum(moduleTimeSpent[i])`
- **Learning Streaks**: Consecutive days calculation with minimum daily requirements
- **Achievement Unlock**: Threshold-based achievement conditions

### Performance and Scaling Constraints
- **Response Time**: Maximum 2-second response time constraint
- **Database Performance**: Query execution time based on data size and indexing

### Learning Analytics Constraints
- **Progress Rate**: `progressRate = (currentProgress - previousProgress) / timePeriod`
- **Learning Efficiency**: `learningEfficiency = knowledgeGained / timeInvested`
- **Engagement Score**: Weighted combination of login frequency, session duration, and completion rate

### Course Rating and Quality Constraints
- **Rating Calculation**: Average rating from individual student ratings
- **Difficulty Adjustment**: Dynamic difficulty based on completion rates

### Resource Utilization Constraints
- **Storage Capacity**: Total system storage management
- **Concurrent Users**: System load and capacity management

## 🔧 How to View the Diagrams

These diagrams are written in PlantUML format and can be viewed using:

1. **Online PlantUML Server**: 
   - Copy the diagram content to [http://www.plantuml.com/plantuml/uml/](http://www.plantuml.com/plantuml/uml/)

2. **VS Code Extension**: 
   - Install "PlantUML" extension
   - Open `.puml` files and use Alt+D to preview

3. **Local PlantUML**: 
   - Install PlantUML locally
   - Generate PNG/SVG: `java -jar plantuml.jar diagram-file.puml`

4. **GitHub Integration**: 
   - Some GitHub markdown processors can render PlantUML directly

## 📊 Diagram Relationships

The three diagrams are interconnected:
- **Requirements Diagram** → **Block Definition Diagram**: Requirements are realized by system blocks
- **Block Definition Diagram** → **Parametric Diagram**: Blocks have parametric constraints that govern their behavior
- **Parametric Diagram** → **Requirements Diagram**: Constraints ensure requirements are met quantitatively

## 🎯 Design Rationale

These SysML diagrams support the software engineering process by:
1. **Requirements Traceability**: Clear mapping from stakeholder needs to system features
2. **Architecture Documentation**: Comprehensive view of system structure and dependencies
3. **Constraint Modeling**: Mathematical foundations for system behavior and performance
4. **Validation**: Quantitative criteria for system verification and validation

## 📝 Notes

- All diagrams follow SysML 1.6 notation standards
- Constraints in the parametric diagram are based on actual system implementation
- Requirements are derived from the project specifications and codebase analysis
- Block definitions reflect the current React.js + Node.js + MongoDB architecture