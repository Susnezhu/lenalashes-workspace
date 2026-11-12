# LenaLashes Workspace - Database structure

Planned database structure. May change during development.

## General Information

All tables include:
- id: Primary key
- createdAt: Record creation date
- updatedAt: Last update date

## Tables

### Users  

Table should contain only working staff information in LenaLashes salon. Loggin for Users will be added separately.

#### Fields

| Column | Type | Description |
|---|---|---|
| name | STRING | Employee name |
| role | EMUN | Employee role (admin, employee) |
| preferredLanguage | ENUM | Preferred language (engl, fi, ru) |
| isActive | BOOLEAN | if user is activated by admin |

### Products  

Stores products, materials and supplies used in the salon.

#### Fields

| Column | Type | Description |
|---|---|---|
| name | STRING | Product name |
| isActive | BOOLEAN | if product is activated by admin |


### Storages

Contain all storages.

#### Fields

| Column | Type | Description |
|---|---|---|
| name | STRING | Storage name |
| isActive | BOOLEAN | Is storage active|


### StorageProducts 

Product and storage relationships

#### Fields

| Column | Type | Description |
|---|---|---|
| storageId | INTEGER | Reference to Storages |
| productId |INTEGER | Reference to Products |
| quantity | INTEGER | Available quantity

Important: 
unique combination of storageId + productId. 
So single product can be located in multiple storages, but in one storage can be only one entry for its quantity.

### StockMovements

Store history about stock changes: delete, edit, add

#### Fields

| Column | Type | Description |
|---|---|---|
| productId | INTEGER | Reference to products |
| userId | INTEGER | who made the change |
| storageId | INTEGER | Reference to storages |
| type | ENUM | add, remove, adjustment (pruduct quantity: increase, decrease, adjustment)|
| reason | STRING | Optional explanation|
| quantity | INTEGER | Changed quantity |
| previousQuantity | INTEGER | Quantity before change |
| newQuantity | INTEGER | Quantity after change |


### CleaningTasks

Contain cleaning tasks and can be edited, added and deleted.

#### Fields

| Column | Type | Description |
|---|---|---|
| name | STRING | short task name |
| description | STRING | task description |
| isActive | BOOLEAN | is task active |


### CleaningSchedule

Contain cleaning schedule for employees. Can be edited by Admin.

#### Fields

| Column | Type | Description |
|---|---|---|
| userId | INTEGER | Reference to Users |
| position | INTEGER | Employee position in rotation (unique!) |



### CleaningMovements

History about cleaning.

#### Fields

| Column | Type | Description |
|---|---|---|
| userId | INTEGER | Assigned employee |
| cleaningScheduleId | INTEGER, NULL | Reference to queue entry |
| weekStart | DATEONLY | Start of cleaning week |
| completedAt | DATE | Actual completion date |
| overdueAt | DATE | When cleaning became overdue |


### Tasks

Contains all tasks for employees. Can be added by admin.

#### Fields

| Column | Type | Description |
|---|---|---|
| userId | INTEGER | Assigned employee |
| status | EMUN | pending, completed, deleted |
| title | STRING | short task title |
| description | STRING | Optional task information |
| completedAt | DATE | Completion date |
| deletedAt | DATE | Date when admin deleted the task |

important:
Add filter for completed/deleted tasks and pending tasks.
Task should not be just deleted from system. Just having deleted status


### Announcements

Contains all announcements. Can be hidden, deleted, edited or added new.

#### Fields

| Column | Type | Description |
|---|---|---|
| title | STRING | short announcement title |
| description | STRING | announcement information |
| isActive | BOOLEAN | is announcement active |


### BonusTransactions 

Bonus transaction history

#### Fields

| Column | Type | Description |
|---|---|---|
| userId | INTEGER | Employee |
| amount | INTEGER | Bonus points amount |
| type | ENUM | earned, spent, adjustment |
| description | STRING | Transaction description |



### Gifts 

Contain all gifts to earn for bonus points

#### Fields

| Column | Type | Description |
|---|---|---|
| name | STRING | Gift name |
| description | TEXT | Gift description |
| bonusCost | INTEGER | Required bonus points |
| quantity | INTEGER | Available quantity |
| isActive | BOOLEAN | is gift available |


### GiftRequests 

All gift request history

#### Fields

| Column | Type | Description |
|---|---|---|
| userId | INTEGER | Employee |
| giftId | INTEGER | Reference to Gifts |
| status | ENUM | pending, approved, rejected, fulfilled |
| fulfilledAt | DATE | Gift received date |

