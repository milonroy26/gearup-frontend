# API Integration Mapping

This frontend consumes the GearUp backend API through `lib/fetcher.ts`. The fetcher prefixes every endpoint with `BACKEND_API_URL` from `.env`.

```env
BACKEND_API_URL=https://gear-up-b7-a4.vercel.app/api
```

If `BACKEND_API_URL` is not set, the frontend falls back to `http://localhost:5000/api`.

## Shared API Layer

| Frontend File | Responsibility |
| --- | --- |
| `lib/fetcher.ts` | Adds the API base URL, reads the `accessToken` cookie on the server, attaches auth headers, supports Next.js cache options, and returns typed API responses. |

## Auth APIs

| Frontend Area | Component/Page | Action Function | Method | Backend Endpoint | Auth | Purpose |
| --- | --- | --- | --- | --- | --- | --- |
| Registration | `features/auth/components/RegisterForm.tsx` | `registerUser` | `POST` | `/auth/register` | Public | Create a customer or provider account. |
| Login | `features/auth/components/LoginForm.tsx` | `loginUser` | `POST` | `/auth/login` | Public | Authenticate user and store JWT access token in an HTTP-only cookie. |
| Logout | `features/auth/hooks/useAuth.tsx` | `logoutUser` | Local cookie action | No backend endpoint | Authenticated client state | Delete the `accessToken` cookie and refresh auth UI. |

## Public Gear And Category APIs

| Frontend Area | Component/Page | Action Function | Method | Backend Endpoint | Auth | Purpose |
| --- | --- | --- | --- | --- | --- | --- |
| Home categories | `app/(public)/page.tsx`, `features/home/components/Category.tsx` | `getAllCategories` | `GET` | `/categories` | Public | Show available gear categories on the home page. |
| Gear listing | `app/(public)/gear/page.tsx` | `getAllGears` | `GET` | `/gear?minPrice=&maxPrice=&sortBy=&sortOrder=&page=&limit=` | Public | Browse, filter, sort, and paginate gear items. |
| Gear details | `app/(public)/gear/[id]/page.tsx` | `getSingleGear` | `GET` | `/gear/:gearId` | Public | Show detailed information for one gear item. |
| Rental entry page | `app/dashboard/customer/rent/[id]/page.tsx` | `getSingleGear` | `GET` | `/gear/:gearId` | Customer | Load selected gear before creating a rental order. |

## Customer Rental, Payment, Return, And Review APIs

| Frontend Area | Component/Page | Action Function | Method | Backend Endpoint | Auth | Purpose |
| --- | --- | --- | --- | --- | --- | --- |
| Create rental | `features/rental/components/BookingForm.tsx` | `createRentalOrder` | `POST` | `/rentals` | Customer | Create a rental order with date range and item quantity. |
| Customer orders | `app/dashboard/customer/orders/page.tsx` | `getMyOrders` | `GET` | `/rentals` | Customer | Fetch the logged-in customer's rental orders. |
| Payment | `features/payment/components/PaymentButton.tsx` | `initiatePayment` | `POST` | `/payments/initiate` | Customer | Create a payment session for a rental order. |
| Return order | `features/rental/components/CustomerReturnReviewAction.tsx` | `returnRentalOrder` | `PATCH` | `/rentals/:orderId/return` | Customer | Return a paid rental order. |
| Create review | `features/rental/components/CustomerReturnReviewAction.tsx` | `createReview` | `POST` | `/reviews` | Customer | Submit rating and comment for the returned gear item. |

## Provider APIs

| Frontend Area | Component/Page | Action Function | Method | Backend Endpoint | Auth | Purpose |
| --- | --- | --- | --- | --- | --- | --- |
| Provider dashboard | `app/dashboard/provider/page.tsx` | `getProviderGears` | `GET` | `/gear/provider/gear` | Provider | Fetch provider inventory. |
| Add gear | `features/provider/components/ProviderGearForm.tsx` | `addProviderGear` | `POST` | `/gear/provider/gear` | Provider | Create a new gear listing. |
| Update gear | `features/provider/components/ProviderInventoryTable.tsx` | `updateProviderGear` | `PUT` | `/gear/provider/gear/:gearId` | Provider | Update gear details or availability. |
| Delete gear | `features/provider/components/ProviderInventoryTable.tsx` | `deleteProviderGear` | `DELETE` | `/gear/provider/gear/:gearId` | Provider | Delete a provider-owned gear listing. |
| Provider orders | `app/dashboard/provider/orders/page.tsx` | `getProviderOrders` | `GET` | `/rentals/provider/orders` | Provider | Fetch incoming rental orders for provider gear. |
| Update order status | `features/provider/components/ProviderOrdersTable.tsx` | `updateOrderStatus` | `PUT` | `/rentals/provider/orders/:orderId` | Provider | Confirm orders, mark picked up, or mark returned. |

## Admin APIs

| Frontend Area | Component/Page | Action Function | Method | Backend Endpoint | Auth | Purpose |
| --- | --- | --- | --- | --- | --- | --- |
| Admin dashboard | `app/dashboard/admin/page.tsx` | `getAdminDashboardMetrics` | `GET` | `/admin/metrics` | Admin | Fetch dashboard metrics. |
| Admin dashboard fallback | `app/dashboard/admin/page.tsx` | `getAdminDashboardMetrics` | `GET` | `/dashboard/metrics` | Admin | Fallback metrics endpoint if `/admin/metrics` fails. |
| User management | `app/dashboard/admin/users/page.tsx` | `getAllUsers` | `GET` | `/admin/users?page=&limit=&search=&role=&status=` | Admin | Fetch users with filters and pagination. |
| User status update | `features/admin/components/UserStatusButton.tsx` | `toggleUserStatus` | `PATCH` | `/admin/users/:userId` | Admin | Suspend or activate a user. |
| Gear moderation | `app/dashboard/admin/gears/page.tsx` | `getAdminAllGears` | `GET` | `/gear` | Admin | Review all gear listings. |
| Rental monitoring | `app/dashboard/admin/orders/page.tsx` | `getAdminAllRentals` | `GET` | `/admin/rentals?page=&limit=&search=&status=` | Admin | Inspect rental orders with filters and pagination. |

## Notes

- Protected requests rely on the `accessToken` HTTP-only cookie set after login.
- Dashboard route access is enforced in `middleware.ts` based on JWT role.
- Server actions revalidate relevant Next.js cache paths or tags after mutations so updated API data appears in the UI.
