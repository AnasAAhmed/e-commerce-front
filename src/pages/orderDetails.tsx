import { Link, Navigate, useParams } from "react-router-dom";
import { Skeleton } from "../components/loader";
import {
    useOrderDetailsQuery,
} from "../redux/api/orderAPI";
import {
    server
} from "../redux/store";
import { Order, OrderItem } from "../types/types";
import { FaArrowLeft } from "react-icons/fa";

const defaultData: Order = {
    shippingInfo: {
        address: "",
        city: "",
        state: "",
        country: "",
        pinCode: "",
    },
    status: "",
    subtotal: 0,
    discount: 0,
    shippingCharges: 0,
    tax: 0,
    total: 0,
    orderItems: [],
    user: { name: "", _id: "",email:"",phone:0 },
    _id: "",
};

const OrderDetails = () => {

    const params = useParams();
    //   const navigate = useNavigate();
    const { isLoading, data, isError } = useOrderDetailsQuery(params.id!);

    
    
    const {
        shippingInfo: { address, city, state, country, pinCode },
        orderItems,
        user: {name ,email,phone},
        status,
        tax,
        subtotal,
        total,
        discount,
        shippingCharges,
    } = data?.order || defaultData;
    if (isError) return <Navigate to={"/404"} />;

    return (
        <div className="user-container ">
            <Link to={"/orders"}>
                <FaArrowLeft />
            </Link>

            <main className="product-management ">
                {isLoading ? (
                    <Skeleton />
                ) : (
                    <>
                        <section
                            style={{
                                padding: "2rem",
                            }}
                        >
                            <h2>Order Items</h2>

                            {orderItems.map((i) => (
                                <OrderProductCard
                                    key={i._id}
                                    name={i.name}
                                    photo={`${server}/${i.photo}`}
                                    productId={i.productId}
                                    _id={i._id}
                                    quantity={i.quantity}
                                    price={i.price}
                                    cutPrice={i.cutPrice}
                                    size={i.size}
                                    style={i.style}
                                    color={i.color}
                                />
                            ))}
                        </section>

                        <article className="shipping-info-card">
                            <h1>Order Info</h1>
                            <h5>User Info</h5>
                            <p>Name: {name}</p>
                            <p>Email: {email}</p>
                            <p>Phone: {phone}</p>
                            <p>
                                Address:{" "}
                                {`${address}, ${city}, ${state}, ${country} ${pinCode}`}
                            </p>
                            <h5>Amount Info</h5>
                            <p>Subtotal: {subtotal}</p>
                            <p>Shipping Charges: {shippingCharges}</p>
                            <p>Tax: {tax}</p>
                            <p>Discount: {discount}</p>
                            <p>Total: {total}</p>

                            <h5>Status Info</h5>
                            <p>
                                Status:{" "}
                                <span
                                    className={
                                        status === "Delivered"
                                            ? "purple"
                                            : status === "Shipped"
                                                ? "green"
                                                : "red"
                                    }
                                >
                                    {status}
                                </span>
                            </p>

                        </article>
                    </>
                )}
            </main>
        </div>
    );
};

const OrderProductCard = ({
    name,
    photo,
    price,
    quantity,
    productId,
    color,
    size,
    style,
}: OrderItem) => (
    <div className="transaction-product-card">
        <img src={photo} alt={name} />
        <Link to={`/product/${productId}`}className="line-clamp-2 w-50" >{name}</Link>
        <span>
            ${price} X {quantity} =${price * quantity}
        </span>
        {size !== '' && <span className="text-gray-500 ">Size: {size}</span>}

          {color !== '' && <span className="text-gray-500 "><span className="rounded-full px-[11px] py-[0.5px] " style={{ backgroundColor: color }}></span></span>}

          {style !== '' && <span className="text-gray-500 ">Style: {style}</span>}
    </div>
);

export default OrderDetails