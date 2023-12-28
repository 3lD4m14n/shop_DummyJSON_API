# Shop
this project is a mockup of a ecommerce, the style is secondary in this, the use of the API and the functionality is the primordial. This project use the [DummyJSON API](dummyjson.com) for get and simulate the processe of the shop.

## Main Page
The main page is where the products are listed, the products are listed in a grid in groups of 20 per page, the pagination funcionality is make with the [react-responsive-pagination](https://react-responsive-pagination.elantha.com) library.

## Products
Every product can be clicked and it will redirect to the product page where we can see the product details and add the product to the cart.

## Aside Menu
The aside menu contains a list of categories of the products, if the user clicks on a category, it will show the products of that category.

## Search Bar
The search bar is used to search for products while the user type anything the app shows the results.

## Login Button
If the user is not logged in the right up corner of the screen will be a button to login, this redirects to the login page. The user can also register but the information is not stored, it will be simulated. All the valid users are in the [DummyJSON Page](https://dummyjson.com/users)

## Car Button
The cart is where the user can see the products added to the cart and the total price. It will be only shown if the user is logged in.

# Start the project

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
