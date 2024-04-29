import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FaArrowLeft, FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { Skeleton } from "../../../components/loader";
import {
  useDeleteProductMutation,
  useProductDetailsQuery,
  useUpdateProductMutation,
} from "../../../redux/api/productAPI";
import { RootState, server } from "../../../redux/store";
import { responseToast } from "../../../utils/features";

const Productmanagement = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const params = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useProductDetailsQuery(params.id!);

  const { price, cutPrice, photo, description, name, stock, category, collections, size, color, style } = data?.product || {
    photo: "",
    category: "",
    collections: "",
    name: "",
    description: "",
    stock: 0,
    price: 0,
    cutPrice: 0,
    size: [],
    color: [],
    style: []
  };

  const [priceUpdate, setPriceUpdate] = useState<number>(price);
  const [cutpriceUpdate, setCutPriceUpdate] = useState<number>(cutPrice);
  const [stockUpdate, setStockUpdate] = useState<number>(stock);
  const [nameUpdate, setNameUpdate] = useState<string>(name);
  const [descriptionUpdate, setDescriptionUpdate] = useState<string>(description);
  const [categoryUpdate, setCategoryUpdate] = useState<string>(category);
  const [collectionsUpdate, setCollectionsUpdate] = useState<string>(collections);
  const [sizeUpdate, setSizeUpdate] = useState<string[]>(size);
  const [colorUpdate, setColorUpdate] = useState<string[]>(color);
  const [styleUpdate, setStyleUpdate] = useState<string[]>(style);
  const [photoUpdate, setPhotoUpdate] = useState<string>("");
  const [photoFile, setPhotoFile] = useState<File>();

  const [load, setLoad] = useState<boolean>(false);

  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];

    const reader: FileReader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPhotoUpdate(reader.result);
          setPhotoFile(file);
        }
      };
    }
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoad(true);

    const formData = new FormData();

    if (nameUpdate) formData.set("name", nameUpdate);
    if (descriptionUpdate) formData.set("description", descriptionUpdate);
    if (priceUpdate) formData.set("price", priceUpdate.toString());
    if (cutpriceUpdate) formData.set("cutPrice", cutpriceUpdate.toString());
    if (stockUpdate !== undefined) formData.set("stock", stockUpdate.toString());
    if (photoFile) formData.set("photo", photoFile);
    if (categoryUpdate) formData.set("category", categoryUpdate);
    if (collectionsUpdate) formData.set("collections", collectionsUpdate);
    if (sizeUpdate.length > 0) {
      sizeUpdate.forEach((s, index) => {
        formData.append(`size[${index}]`, s);
      });
    }
    if (colorUpdate.length > 0) {
      colorUpdate.forEach((c, index) => {
        formData.append(`color[${index}]`, c);
      });
    }
    if (styleUpdate.length > 0) {
      styleUpdate.forEach((st, index) => {
        formData.append(`style[${index}]`, st);
      });
    }
    const res = await updateProduct({
      formData,
      userId: user?._id!,
      productId: data?.product._id!,
    });
    setLoad(false);

    responseToast(res, navigate, "/admin/product");
  };

  const deleteHandler = async () => {
    const res = await deleteProduct({
      userId: user?._id!,
      productId: data?.product._id!,
    });

    responseToast(res, navigate, "/admin/product");
  };

  useEffect(() => {
    if (data) {
      setNameUpdate(data.product.name);
      setDescriptionUpdate(data.product.description);
      setPriceUpdate(data.product.price);
      setCutPriceUpdate(data.product.cutPrice);
      setStockUpdate(data.product.stock);
      setCategoryUpdate(data.product.category);
      setCollectionsUpdate(data.product.collections);
      setSizeUpdate(data.product.size);
      setColorUpdate(data.product.color);
      setStyleUpdate(data.product.style);
    }
  }, [data]);

  if (isError) return <Navigate to={"/404"} />;

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        <Link to={"/admin/transaction"}>
          <FaArrowLeft />
        </Link>
        {isLoading ? (
          <Skeleton length={20} />
        ) : (
          <>
            <section>
              <strong>ID - {data?.product._id}</strong>
              <img src={`${server}/${photo}`} alt="Product" />
              <p>{name}</p>
              {stock > 0 ? (
                <>
                  {stock < 6 ? (
                    <span className="red">{stock} Low Stock</span>
                  ) : (
                    <span className="green">{stock} Available</span>
                  )}
                </>) : (
                <span className="red">Not Available</span>

              )}
              <h3>${price}</h3>
              <h2 className="text-lg font-bold text-red-500 line-through">${cutPrice}</h2>
            </section>
            <article>
              <button className="product-delete-btn" onClick={deleteHandler}>
                <FaTrash />
              </button>
              <form onSubmit={submitHandler}>
                <h2>Manage</h2>
                <div>
                  <label>Name</label>
                  <input
                    type="text"
                    placeholder="Name"
                    value={nameUpdate}
                    onChange={(e) => setNameUpdate(e.target.value)}
                  />
                </div>
                <div>
                  <label>Description</label>
                  <textarea
                    required
                    rows={2}
                    className="w-full border-2 p-2 border-gray-300"
                    placeholder="Description"
                    value={descriptionUpdate}
                    onChange={(e) => setDescriptionUpdate(e.target.value)}
                  />
                </div>
                <div>
                  <label>Price</label>
                  <input
                    type="number"
                    placeholder="Price"
                    value={priceUpdate}
                    onChange={(e) => setPriceUpdate(Number(e.target.value))}
                  />
                </div>
                <div>
                  <label>Cut Price</label>
                  <input
                    type="number"
                    placeholder="Cut Price"
                    value={cutpriceUpdate}
                    onChange={(e) => setCutPriceUpdate(Number(e.target.value))}
                  />
                </div>
                <div>
                  <label>Stock</label>
                  <input
                    type="number"
                    placeholder="Stock"
                    value={stockUpdate}
                    onChange={(e) => setStockUpdate(Number(e.target.value))}
                  />
                </div>
                <div>
                  <label>Category</label>
                  <input
                    type="text"
                    placeholder="eg. laptop, camera etc"
                    value={categoryUpdate}
                    onChange={(e) => setCategoryUpdate(e.target.value)}
                  />
                </div>
                <div>
                  <label>collections</label>
                  <input
                    type="text"
                    placeholder="eg. laptop, camera etc"
                    value={collectionsUpdate}
                    onChange={(e) => setCollectionsUpdate(e.target.value)}
                  />
                </div>
                <div>
                  <label>Size (comma-separated)</label>
                  <input
                    type="text"
                    placeholder="eg. S, M, L"
                    value={sizeUpdate.join(",")}
                    onChange={(e) => setSizeUpdate(e.target.value.split(",").map(item => item.trim()))}
                  />
                </div>
                <div>
                  <label>Color (comma-separated)</label>
                  <input
                    type="text"
                    placeholder="eg. Red, Blue, Green"
                    value={colorUpdate.join(",")}
                    onChange={(e) => setColorUpdate(e.target.value.split(",").map(item => item.trim()))}
                  />
                </div>
                <div>
                  <label>Style (comma-separated)</label>
                  <input
                    type="text"
                    placeholder="eg. Casual, Formal, Sporty"
                    value={styleUpdate.join(",")}
                    onChange={(e) => setStyleUpdate(e.target.value.split(",").map(item => item.trim()))}
                  />
                </div>
                <div>
                  <label>Photo</label>
                  <input type="file" onChange={changeImageHandler} />
                </div>
                {photoUpdate && <img src={photoUpdate} alt="New Image" />}
                <button type="submit">{load ? "Updating..." : "Update"}</button>
              </form>
            </article>
          </>
        )}
      </main>
    </div>
  );
};

export default Productmanagement;
