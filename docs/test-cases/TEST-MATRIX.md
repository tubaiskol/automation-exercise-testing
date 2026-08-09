# Test Classification and Traceability Matrix

This matrix separates browser-based UI coverage from request-based API coverage
and assigns every official Automation Exercise scenario to its manual and
automated test location.

Status values:

- `Automated`: executable Playwright coverage exists.
- `Planned`: the target file exists, but the scenario still needs implementation.

## UI Test Cases

| ID | Scenario | Manual test case | Automated test | Status |
|---|---|---|---|---|
| TC-001 | Register User | `ui/authentication/TC-001-register-user.md` | `tests/e2e/ui/authentication/register.spec.ts` | Planned |
| TC-002 | Login User with correct email and password | `ui/authentication/TC-002-login-valid-user.md` | `tests/e2e/ui/authentication/login.spec.ts` | Automated |
| TC-003 | Login User with incorrect email and password | `ui/authentication/TC-003-login-invalid-user.md` | `tests/e2e/ui/authentication/login.spec.ts` | Automated |
| TC-004 | Logout User | `ui/authentication/TC-004-logout-user.md` | `tests/e2e/ui/authentication/logout.spec.ts` | Planned |
| TC-005 | Register User with existing email | `ui/authentication/TC-005-register-existing-email.md` | `tests/e2e/ui/authentication/register.spec.ts` | Planned |
| TC-006 | Contact Us Form | `ui/contact/TC-006-contact-us-form.md` | `tests/e2e/ui/contact/contact-us.spec.ts` | Planned |
| TC-007 | Verify Test Cases Page | `ui/navigation/TC-007-verify-test-cases-page.md` | `tests/e2e/ui/navigation/test-cases.spec.ts` | Planned |
| TC-008 | Verify All Products and Product Details | `ui/products/TC-008-products-and-details.md` | `tests/e2e/ui/products/products.spec.ts` | Planned |
| TC-009 | Search Product | `ui/products/TC-009-search-product.md` | `tests/e2e/ui/products/search.spec.ts` | Planned |
| TC-010 | Verify Subscription on Home Page | `ui/navigation/TC-010-home-subscription.md` | `tests/e2e/ui/navigation/subscription.spec.ts` | Planned |
| TC-011 | Verify Subscription on Cart Page | `ui/navigation/TC-011-cart-subscription.md` | `tests/e2e/ui/navigation/subscription.spec.ts` | Planned |
| TC-012 | Add Products to Cart | `ui/cart/TC-012-add-products.md` | `tests/e2e/ui/cart/add-to-cart.spec.ts` | Planned |
| TC-013 | Verify Product Quantity in Cart | `ui/cart/TC-013-cart-quantity.md` | `tests/e2e/ui/cart/cart-quantity.spec.ts` | Planned |
| TC-014 | Place Order: Register During Checkout | `ui/checkout/TC-014-register-during-checkout.md` | `tests/e2e/ui/checkout/register-during-checkout.spec.ts` | Planned |
| TC-015 | Place Order: Register Before Checkout | `ui/checkout/TC-015-register-before-checkout.md` | `tests/e2e/ui/checkout/register-before-checkout.spec.ts` | Planned |
| TC-016 | Place Order: Login Before Checkout | `ui/checkout/TC-016-login-before-checkout.md` | `tests/e2e/ui/checkout/login-before-checkout.spec.ts` | Planned |
| TC-017 | Remove Products from Cart | `ui/cart/TC-017-remove-products.md` | `tests/e2e/ui/cart/remove-from-cart.spec.ts` | Planned |
| TC-018 | View Category Products | `ui/products/TC-018-category-products.md` | `tests/e2e/ui/products/category.spec.ts` | Planned |
| TC-019 | View and Cart Brand Products | `ui/products/TC-019-brand-products.md` | `tests/e2e/ui/products/brand.spec.ts` | Planned |
| TC-020 | Search Products and Verify Cart After Login | `ui/products/TC-020-search-cart-after-login.md` | `tests/e2e/ui/products/search.spec.ts` | Planned |
| TC-021 | Add Review on Product | `ui/products/TC-021-product-review.md` | `tests/e2e/ui/products/review.spec.ts` | Planned |
| TC-022 | Add to Cart from Recommended Items | `ui/cart/TC-022-recommended-items.md` | `tests/e2e/ui/cart/recommended-items.spec.ts` | Planned |
| TC-023 | Verify Address Details in Checkout | `ui/checkout/TC-023-address-details.md` | `tests/e2e/ui/checkout/address.spec.ts` | Planned |
| TC-024 | Download Invoice After Purchase | `ui/checkout/TC-024-download-invoice.md` | `tests/e2e/ui/checkout/invoice.spec.ts` | Planned |
| TC-025 | Scroll Up with Arrow and Scroll Down | `ui/navigation/TC-025-scroll-with-arrow.md` | `tests/e2e/ui/navigation/scroll.spec.ts` | Planned |
| TC-026 | Scroll Up Without Arrow and Scroll Down | `ui/navigation/TC-026-scroll-without-arrow.md` | `tests/e2e/ui/navigation/scroll.spec.ts` | Planned |

## API Test Cases

| ID | Method and scenario | Manual test case | Automated test | Status |
|---|---|---|---|---|
| API-001 | GET all products | `api/products/API-001-get-all-products.md` | `tests/e2e/api/products/products.api.spec.ts` | Automated |
| API-002 | POST to products list | `api/products/API-002-post-products-list.md` | `tests/e2e/api/products/products.api.spec.ts` | Automated |
| API-003 | GET all brands | `api/products/API-003-get-all-brands.md` | `tests/e2e/api/products/brands.api.spec.ts` | Automated |
| API-004 | PUT to brands list | `api/products/API-004-put-brands-list.md` | `tests/e2e/api/products/brands.api.spec.ts` | Automated |
| API-005 | POST search product | `api/products/API-005-search-product.md` | `tests/e2e/api/products/search.api.spec.ts` | Automated |
| API-006 | POST search without required parameter | `api/products/API-006-search-without-parameter.md` | `tests/e2e/api/products/search.api.spec.ts` | Automated |
| API-007 | POST verify login with valid details | `api/authentication/API-007-verify-valid-login.md` | `tests/e2e/api/authentication/verify-login.api.spec.ts` | Planned |
| API-008 | POST verify login without email | `api/authentication/API-008-verify-login-without-email.md` | `tests/e2e/api/authentication/verify-login.api.spec.ts` | Planned |
| API-009 | DELETE to verify-login endpoint | `api/authentication/API-009-delete-verify-login.md` | `tests/e2e/api/authentication/verify-login.api.spec.ts` | Planned |
| API-010 | POST verify login with invalid details | `api/authentication/API-010-verify-invalid-login.md` | `tests/e2e/api/authentication/verify-login.api.spec.ts` | Planned |
| API-011 | POST create account | `api/accounts/API-011-create-account.md` | `tests/e2e/api/accounts/accounts.api.spec.ts` | Planned |
| API-012 | DELETE account | `api/accounts/API-012-delete-account.md` | `tests/e2e/api/accounts/accounts.api.spec.ts` | Planned |
| API-013 | PUT update account | `api/accounts/API-013-update-account.md` | `tests/e2e/api/accounts/accounts.api.spec.ts` | Planned |
| API-014 | GET user details by email | `api/accounts/API-014-get-user-by-email.md` | `tests/e2e/api/accounts/accounts.api.spec.ts` | Planned |
