# 🧾 NEXT.js Order CRUD – Project Overview & Technical Documentation

## 📁 Folder Structure

```
src/
├── app/                   # App Router structure (Next.js 13+)
│   ├── page.tsx          # Home - order list view
│   ├── layout.tsx        # Root layout
│   ├── new/              # Create order page
│   │   └── order-form.tsx
│   └── orders/[id]/edit/ # Edit order page (dynamic route)
│       └── page.tsx
├── components/
│   ├── ui/               # ShadCN UI base components
│   ├── orders/           # Domain-specific components (OrderTable, Form, etc.)
│   ├── shared/           # Reusable logic components (ConfirmDialog, etc.)
│   └── layout/           # Navbar, Theme Toggle, etc.
├── hooks/                # Custom hooks (useOrder, useFetchOrders)
├── lib/                  # Helpers and utils (toast, formatting, etc.)
├── services/             # API client and order service layer
├── types/                # Global TypeScript types
```

---

## 🌐 App Pages

### `/` – Home

- Lists all orders using `<OrderTable />`
- Data loaded via `useFetchOrders()`
- Includes button to `/new` to create an order

### `/new` – Create Order

- Form handled by `OrderForm`
- Hook: `useOrder()` handles state + submission
- UI: add products, confirm with toast

### `/orders/[id]/edit` – Edit Order

- Same `OrderForm`, initialized with fetched order data
- Updates order and redirects to `/` with success toast

---

## ⚙️ Key Concepts in React + Next.js

| Concept               | Implementation                                        |
|----------------------|--------------------------------------------------------|
| Dynamic Routing       | `[id]/edit/page.tsx`                                  |
| Dialogs               | `AddProductDialog`, `EditProductDialog`, `ConfirmDialog` |
| Toast Notifications   | `sonner` via `notifySuccess`, `notifyError` helpers   |
| Controlled Inputs     | Inputs in form & dialog with `useState`               |
| State Management      | Via `useState` and `props`                            |
| Custom Hooks          | `useOrder`, `useFetchOrders`                          |
| API Layer             | `orderService.ts` using `apiClient.ts` abstraction    |
| Type Safety           | `Order`, `OrderPayload`, `SelectedOrderProduct`       |

---

## ✅ Best Practices Applied

- Component folders grouped by domain (`orders`, `shared`)
- Hook logic fully separated from UI
- Toast logic extracted into reusable `lib/toast.ts`
- Controlled use of dynamic route for order editing
- Responsive UI with Tailwind and ShadCN
- Reusable components like `ConfirmDialog`

---

## 💡 Suggested Improvements

- [ ] Add form validation (`zod`, `react-hook-form`)
- [ ] Add skeleton loading states
- [ ] Implement pagination / search in orders list
- [ ] Unit tests with `Jest` or `React Testing Library`
- [ ] Optimize accessibility in dialogs

---

## 🚀 Technologies Used

- **Next.js 13+** with App Router
- **TypeScript**
- **Tailwind CSS**
- **ShadCN UI + Sonner**
- **React hooks + custom logic**
