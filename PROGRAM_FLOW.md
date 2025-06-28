# Gridverse Application Flow Map

## 🏗️ Architecture Overview

```
┌─────────────────┐    HTTP Requests    ┌─────────────────┐    Database    ┌─────────────────┐
│   Frontend      │ ◄─────────────────► │    Backend      │ ◄────────────► │     MySQL       │
│   (Next.js)     │                     │   (Express)     │                │   (Prisma)      │
└─────────────────┘                     └─────────────────┘                └─────────────────┘
```

## 📱 Frontend Structure

### Main Page (`src/app/page.tsx`)
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              Gridverse App                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                            Header                                   │    │
│  │  [Add Cell] [Remove Cell]                    [Theme Toggle]        │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐                          │
│  │Cell1│ │Cell2│ │Cell3│ │Cell4│ │Cell5│ │Cell6│                          │
│  │🚀   │ │💎   │ │🔥   │ │⚡   │ │🌙   │ │⭐   │                          │
│  └─────┘ └─────┘ └─────┘ └─────┘ └─────┘ └─────┘                          │
│                                                                             │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐                          │
│  │Cell7│ │Cell8│ │Cell9│ │Cell10││Cell11││Cell12│                          │
│  │🎯   │ │🎲   │ │🎮   │ │🎪   │ │🎨   │ │🎭   │                          │
│  └─────┘ └─────┘ └─────┘ └─────┘ └─────┘ └─────┘                          │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Component Hierarchy
```
Page (Grid)
├── Header
│   ├── Add Cell Button
│   ├── Remove Cell Button
│   └── Theme Toggle
├── Cell Grid
│   └── Cell Components (dynamically rendered)
└── Modals (conditionally rendered)
    ├── AddCellModal
    ├── UpdateCellModal
    └── DeleteCellModal
```

## 🔄 Data Flow

### 1. Initial Load
```
┌─────────────┐   1. useEffect     ┌─────────────┐   2. GET /api/v1/cells    ┌─────────────┐
│   Page      │ ─────────────────► │   Backend   │ ───────────────────────► │   Database  │
│             │                    │             │                          │             │
│ setCells()  │ ◄───────────────── │ JSON Data   │ ◄─────────────────────── │ Cell Records│
└─────────────┘   3. Update State  └─────────────┘   4. Prisma Query       └─────────────┘
```

### 2. Add Cell Flow
```
┌─────────────┐   Click "Add Cell"  ┌─────────────┐
│   Header    │ ──────────────────► │    Page     │
│             │                     │             │
└─────────────┘                     │ setShowAddCellModal(true)
                                   │
                                   ▼
┌─────────────┐   Modal Opens      ┌─────────────┐   Form Submit     ┌─────────────┐
│   Page      │ ◄───────────────── │AddCellModal │ ─────────────────► │   Backend   │
│             │                    │             │                   │             │
│ setCells()  │ ◄───────────────── │ setCells()  │ ◄───────────────── │ POST /create│
└─────────────┘   UI Updates       └─────────────┘   New Cell Data   └─────────────┘
```

### 3. Update Cell Flow
```
┌─────────────┐   Click Cell       ┌─────────────┐
│    Cell     │ ──────────────────► │    Page     │
│             │                     │             │
└─────────────┘                     │ setSelectedCell(cell)
                                   │ setShowUpdateCellModal(true)
                                   │
                                   ▼
┌─────────────┐   Modal Opens      ┌─────────────┐   Form Submit     ┌─────────────┐
│   Page      │ ◄───────────────── │UpdateModal  │ ─────────────────► │   Backend   │
│             │                    │             │                   │             │
│ setCells()  │ ◄───────────────── │ setCells()  │ ◄───────────────── │ PUT /update │
└─────────────┘   UI Updates       └─────────────┘   Updated Data    └─────────────┘
```

### 4. Delete Cell Flow
```
┌─────────────┐   Click "Remove"   ┌─────────────┐
│   Header    │ ──────────────────► │    Page     │
│             │                     │             │
└─────────────┘                     │ setShowDeleteCellModal(true)
                                   │
                                   ▼
┌─────────────┐   Modal Opens      ┌─────────────┐   Form Submit     ┌─────────────┐
│   Page      │ ◄───────────────── │DeleteModal  │ ─────────────────► │   Backend   │
│             │                    │             │                   │             │
│ setCells()  │ ◄───────────────── │ setCells()  │ ◄───────────────── │ DELETE /delete│
└─────────────┘   UI Updates       └─────────────┘   Filtered Array  └─────────────┘
```

## 🗄️ Database Schema

```
┌─────────────────────────────────────────────────────────┐
│                    BasicCell Table                      │
├─────────────────────────────────────────────────────────┤
│ id            │ Int       │ Primary Key, Auto Increment │
│ name          │ String    │ Unique                      │
│ icon          │ String    │ Unique                      │
│ iconCode      │ String    │ Unique                      │
│ currentValue  │ Int       │ Numeric Value               │
│ updatedAt     │ DateTime  │ Auto Updated Timestamp      │
└─────────────────────────────────────────────────────────┘
```

## 🔌 API Endpoints

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              API Routes                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│ GET    /api/v1/cells              │ Get all cells                          │
│ GET    /api/v1/cells/:name        │ Get cell by name                       │
│ POST   /api/v1/cells/create       │ Create new cell                        │
│ PUT    /api/v1/cells/update/:name │ Update existing cell                   │
│ DELETE /api/v1/cells/delete/:name │ Delete cell by name                    │
└─────────────────────────────────────────────────────────────────────────────┘
```

## 🎯 Key Features & Interactions

### State Management
- **Global State**: `cells` array in main Page component
- **Modal States**: `showAddCellModal`, `showUpdateCellModal`, `showDeleteCellModal`
- **Selected Cell**: `selectedCell` for update operations

### User Interactions
1. **View Grid**: Cells display in responsive grid layout
2. **Add Cell**: Header button → Modal → Form → API → UI Update
3. **Update Cell**: Click cell → Modal → Form → API → UI Update
4. **Delete Cell**: Header button → Modal → Form → API → UI Update
5. **Theme Toggle**: Header component for dark/light mode

### Error Handling
- Form validation in modals
- API error responses
- Try-catch blocks for network requests
- User feedback via status messages

### Responsive Design
- Grid adapts: 2 cols (sm) → 3 cols (md) → 6 cols (lg)
- Modal overlays with backdrop
- Mobile-friendly button sizes

## 🔧 Technical Stack

```
Frontend:
├── Next.js 14 (React Framework)
├── TypeScript
├── Tailwind CSS (Styling)
└── Client-side State Management

Backend:
├── Express.js (Node.js Framework)
├── Prisma (ORM)
├── MySQL (Database)
└── RESTful API Design

Development:
├── ESLint (Code Quality)
├── TypeScript (Type Safety)
└── Hot Reload (Development)
```

## 🚀 Deployment Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   (Vercel/      │    │   (Railway/     │    │   (PlanetScale/ │
│    Netlify)     │    │    Render)      │    │    Supabase)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
``` 