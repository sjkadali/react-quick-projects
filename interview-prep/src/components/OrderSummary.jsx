import { useState, useEffect } from 'react';

const users = [
    { id: 1, name: 'Alice', age: 30 },
    { id: 2, name: 'Bob', age: 25 },
    { id: 3, name: 'Charlie', age: 35 }
  ];
  
  const products = [
    { id: 101, name: 'Product A', price: 50 },
    { id: 102, name: 'Product B', price: 100 },
    { id: 103, name: 'Product C', price: 75 }
  ];

  let productById = {};
  products.forEach((el) => productById[el.id]  = el);

  let userById = {};
  users.forEach((el) => userById[el.id]  = el);

  const orders = [
    { id: 1001, userId: 1, productId: 101, quantity: 2 },
    { id: 1002, userId: 2, productId: 102, quantity: 1 },
    { id: 1003, userId: 1, productId: 103, quantity: 3 }
  ];
  
  const generateOrderSummary = ({ orders, products, users }) => {
      // TODO: it should generate summary for every order
    // so that response will look like this:
    //{
    //  orderId: 1001,
    //  user: { id: 1, name: 'Alice', age: 30 },
    //  product: { id: 101, name: 'Product A', price: 50 },
    //  total: 100 // price * quantity
    //}
    
    // Additional (OPTIONAL) task
    // what is time complexity of your solution?
    // is it possible to make it in O(n) ?
    // rewrite your solution to be the fastest
    const orderSummary = [];
    orders.forEach(function(order) {
        const prdtId = order.productId;
        const usrId = order.userId;
        
        //const prdt = products.filter(p => p.id===prdtId); 

        /***************
         using a dictionary instead of linear search through array
         improves time complexity from O(n*m) where n is the number of
         orders and m is the number of products.
         By using a dictionary, time complexity becomes O(n) assuming
         a constant cost for hash access using the JS implementation of dictionary.
         
         Similar consideration applies for users.
         *********/
        const prdt = productById[prdtId];      
        
        //const usr =  users.filter(u => u.id ===usrId);
        const usr = userById[usrId];

        if (prdt !== -1) {
            console.log(": " + prdt);
        } else {
            console.log("Product not found.");
        }

        if (usr !== -1) {
            console.log(": " + usr);
        } else {
            console.log("User not found.");
        }

        const totPrice = parseFloat(prdt.price) * parseInt(order.quantity);

        const orderDetails = {"orderId": order.id,
                                "user": usr,
                                "product": prdt,
                                "total": totPrice
                            }
        orderSummary.push(orderDetails);
    });
    return orderSummary;
  }
  
  const OrderSummary = () => {
      const [body, setBody] = useState({});
    
    useEffect(() => {
          setBody(generateOrderSummary({ products, orders, users }))
    }, []);
    
      return (
        <div className="container">
        <pre>{JSON.stringify(body, null, 2)}</pre>
        </div>
    )
  }
  
 export default OrderSummary
  