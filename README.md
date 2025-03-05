# Shopping Cart Application

A fully functional shopping cart application built using modern web technologies. This app allows users to browse products, add them to their favorites, manage their cart, apply coupons for discounts, and complete payments via Razorpay.

## Features

- **Product Display**: View a list of products with details such as name, price, and image.
- **Favorites Management**:
  - Add products to favorites.
  - Remove products from favorites.
- **Cart Management**:
  - Add products to the cart.
  - View the total number of items and products in the cart.
  - Calculate the final amount based on applied coupons.
  - Shipping charges are waived for orders above $50.
- **Coupon System**:
  - Apply coupons to get discounts on the total amount.
  - If no coupon is applied, the total amount remains unchanged.
- **Payment Integration**:
  - Integrated with Razorpay for secure payments.
- **Responsive Design**: Built using Bootstrap for a mobile-friendly experience.

## Technologies Used

- **Frontend**:
  - [Vite](https://vitejs.dev/) - Fast build tool and development server.
  - [React](https://reactjs.org/) - JavaScript library for building user interfaces.
  - [React Router DOM](https://reactrouter.com/) - For routing and navigation.
  - [Redux Toolkit](https://redux-toolkit.js.org/) - State management for managing cart and favorites.
  - [Bootstrap](https://getbootstrap.com/) - For styling and responsive design.
- **Payment Gateway**:
  - [Razorpay](https://razorpay.com/) - For secure payment processing.

## How to Run the Project Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/venkataranjit/shopping-cart.git
   ```
   
2. **Navigate to the project directory**:

   ```bash
  cd shopping-cart-app
   ```

3. **Install dependencies**:

   ```bash
   npm install
   ```

4. **Run the application**:

   ```bash
   npm run dev
   ```

5. **Open the application**:
   Visit `http://localhost:5173` in your browser.

## Contribution

Contributions are welcome! Feel free to fork the repository and submit a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

**Shopping Cart App** -
