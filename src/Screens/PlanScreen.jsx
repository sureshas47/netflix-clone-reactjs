import { product } from "prelude-ls";
import { useEffect } from "react";
import { React, useState } from "react";
import db from "../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import "./planScreen.css";
import { loadStripe } from "@stripe/stripe-js";

function PlanScreen() {
  const [products, setProducts] = useState([]);
  const user = useSelector(selectUser); //taking current user
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    db.collection("customers")
      .doc(user.uid)
      .collection("subscriptions")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(async (subscription) => {
          setSubscription({
            role: subscription.data().role,
            current_period_end: subscription.data().current_period_end.seconds,
            current_period_start:
              subscription.data().current_period_start.seconds,
          });
        });
      });
  }, [user.uid]);

  useEffect(() => {
    db.collection("products")
      .where("active", "==", true) // apply filter & get active products
      .get()
      .then((querySnapshot) => {
        const products = {};
        querySnapshot.forEach(async (productDoc) => {
          products[productDoc.id] = productDoc.data();
          const priceSnap = await productDoc.ref.collection("prices").get();

          priceSnap.docs.forEach((price) => {
            products[productDoc.id].prices = {
              priceId: price.id,
              priceData: price.data(),
            };
            console.log(price);
          });
        });
        setProducts(products);
      });
  }, []);
  console.log(products);
  console.log(subscription);

  const loadCheckout = async (priceId) => {
    const docRef = await db
      .collection("customers")
      .doc(user.uid) //taking user to checkout
      .collection("checkout_sessions")
      .add({
        //adding checkout_session
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });
    docRef.onSnapshot(async (snap) => {
      const { error, sessionId } = snap.data(); //destructure snap data
      if (error) {
        // show an error to customer
        // inspect cloud function logs in the firebase console
        alert(`an error occured: ${error.message}`);
      }
      if (sessionId) {
        // we have a session,lets redirect to checkout
        // init stripe

        const stripe = await loadStripe(
          "pk_test_51J3XYqBk2dwUROJAVC1Vti73Pj4TOWNkLGxrUIPFhFywERSAQNFjALcvw48sCwxrwizMLn8F3QzaUVNOhTnntucn00QkC12F4w"
        );
        stripe.redirectToCheckout({ sessionId });
        // goto stripe dashbaord > products > choose plan > edit metadata > put role as firebaseRole and plan(basic.premium.stansard)
      }
    });
  };

  return (
    <div className="planScreen"><br />
    {subscription &&<p>Renewal Date: {new Date
    (subscription?.current_period_end*1000).toLocaleDateString()}</p>}

      {Object.entries(products).map(([productId, productData]) => {
        // TODO   add some logic to check if the user's subs is active
        const isCurrentPackage = productData.name
          ?.toLowerCase()
          .includes(subscription?.role);
        return (
          <div key={productId} className={`${isCurrentPackage && 'planScreen_plan_disable'} planScreen_plan`}>
            <div className="planScreen_info">
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>
            <button
              className="planScreen_button"
              onClick={() =>
                // if condition not meet goto to load checkout
                !isCurrentPackage && loadCheckout(productData.prices.priceId)
              }
            >
              {/* if condition meets show current package else show subscribe */}
              {isCurrentPackage ? "Current Package" : "Subscribe"}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default PlanScreen;
