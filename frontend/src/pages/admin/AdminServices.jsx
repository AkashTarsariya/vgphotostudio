import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Plus, Trash2, Pencil, Edit } from "lucide-react";
import api from "../../services/api";

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  const fetchServices = () => {
    api.get("/services?all=true").then(({ data }) => setServices(data.data));
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // const onSubmit = async (data) => {
  //   try {
  //     const payload = {
  //       ...data,
  //       price: Number(data.price),
  //       deliverables: data.deliverables?.split('\n').filter(Boolean) || [],
  //       isPopular: data.isPopular === 'true',
  //       isActive: data.isActive !== 'false',
  //     };
  //     await api.post('/services', payload);
  //     toast.success('Service created');
  //     reset();
  //     setShowForm(false);
  //     fetchServices();
  //   } catch (err) {
  //     toast.error(err.response?.data?.message || 'Failed');
  //   }
  // };

  const onSubmit = async (data) => {
    try {
      // const payload = {
      //   ...data,
      //   price: Number(data.price),
      //   deliverables: data.deliverables?.split("\n").filter(Boolean),
      //   isPopular: data.isPopular === "true",
      //   isActive: data.isActive !== "false",
      // };

      const payload = {
        ...data,

        price: Number(data.price),

        deliverables: data.deliverables?.split("\n").filter(Boolean) || [],

        addOns:
          data.addOns
            ?.split("\n")
            .filter(Boolean)
            .map((item) => {
              const [name, description, price] = item.split("|");

              return {
                name: name?.trim(),
                description: description?.trim(),
                price: Number(price?.trim()),
              };
            }) || [],

        isPopular: data.isPopular === "true",

        isActive: data.isActive !== "false",
      };

      if (editingService) {
        await api.put(`/services/${editingService._id}`, payload);
        toast.success("Service updated");
      } else {
        await api.post("/services", payload);
        toast.success("Service created");
      }

      fetchServices();

      reset();
      setEditingService(null);
      setShowForm(false);
    } catch (err) {
      // } catch (err) {
      //   toast.error(err.response?.data?.message || "Failed");
      // }
      console.error("Create Service Error:", err);
      console.error("Response Data:", err.response?.data);

      toast.error(
        err.response?.data?.message || err.response?.data?.error || "Failed",
      );
    }
  };

  const handleEdit = (service) => {
    setEditingService(service);

    reset({
      name: service.name,
      slug: service.slug,
      price: service.price,
      duration: service.duration,
      description: service.description,
      deliverables: service.deliverables?.join("\n"),
      addOns: service.addOns
        ?.map(
          (addon) => `${addon.name} | ${addon.description} | ${addon.price}`,
        )
        .join("\n"),
      isPopular: service.isPopular ? "true" : "false",
      isActive: service.isActive ? "true" : "false",
    });

    setShowForm(true);

    // Scroll to the form like Projects page
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete service?")) return;
    await api.delete(`/services/${id}`);
    toast.success("Deleted");
    fetchServices();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-2xl">Services</h1>
        {/* <button onClick={() => setShowForm(!showForm)} className="btn-primary text-sm py-2 px-4 flex items-center gap-2">
          <Plus size={16} /> Add Service
        </button> */}
        <button
          onClick={() => {
            if (showForm) {
              // Close form
              setShowForm(false);
              setEditingService(null);
              reset();
            } else {
              // Open fresh form
              setEditingService(null);

              reset({
                name: "",
                slug: "",
                price: "",
                duration: "",
                description: "",
                deliverables: "",
                addOns: "",
                isPopular: "false",
                isActive: "true",
              });

              setShowForm(true);
            }
          }}
          className="btn-primary text-sm py-2 px-4 flex items-center gap-2"
        >
          <Plus size={16} />
          Add Service
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white dark:bg-gray-900 border p-6 mb-8 space-y-4"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <input
              className="input-field"
              placeholder="Name"
              {...register("name", { required: true })}
            />
            <input
              className="input-field"
              placeholder="Slug"
              {...register("slug", { required: true })}
            />
            <input
              type="number"
              className="input-field"
              placeholder="Price (INR)"
              {...register("price", { required: true })}
            />
            <input
              className="input-field"
              placeholder="Duration"
              {...register("duration", { required: true })}
            />
          </div>
          <textarea
            className="input-field"
            rows={3}
            placeholder="Description"
            {...register("description", { required: true })}
          />
          <textarea
            className="input-field"
            rows={3}
            placeholder="Deliverables (one per line)"
            {...register("deliverables")}
          />
          <textarea
            className="input-field"
            rows={5}
            placeholder={`Add-ons (One per line)
              
            Format:
            Name | Description | Price
            
            Example:
            Second Photographer | Additional coverage angle | 15000
            Drone Coverage | Aerial shots of venue | 12000`}
            {...register("addOns")}
          />

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-medium">Popular Status</label>

              <select
                className="input-field"
                {...register("isPopular")}
                defaultValue="false"
              >
                <option value="false">Not Popular</option>
                <option value="true">⭐ Popular</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium">Service Status</label>

              <select
                className="input-field"
                {...register("isActive")}
                defaultValue="true"
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>
          </div>

          {/* <button type="submit" className="btn-primary text-sm">Create Service</button> */}
          <button type="submit" className="btn-primary text-sm">
            {editingService ? "Update Service" : "Create Service"}
          </button>

          {editingService && (
            <button
              type="button"
              className="btn-secondary"
              onClick={() => {
                reset();
                setEditingService(null);
                setShowForm(false);
              }}
            >
              Cancel
            </button>
          )}
        </form>
      )}

      {/* <div className="space-y-3">
        {services.map((s) => (
          <div
            key={s._id}
            // className="flex justify-between items-center bg-white dark:bg-gray-900 border p-4"
            className="bg-white dark:bg-gray-900 border rounded-md px-4 py-5 flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{s.name}</p>
              <p className="text-sm text-muted">
                ₹{s.price?.toLocaleString("en-IN")} · {s.duration}
              </p>
            </div>
            <button
              onClick={() => handleEdit(s)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
            >
              <Edit size={16} />
            </button>
            <button
              onClick={() => handleDelete(s._id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div> */}

      <div className="space-y-3">
        {services.map((s) => (
          <div
            key={s._id}
            className="bg-white dark:bg-gray-900 border rounded-md px-4 py-5 flex justify-between items-start"
          >
            {/* Service Info */}
            <div>
              <h3 className="font-semibold text-lg">{s.name}</h3>

              <p className="text-sm text-muted">
                ₹{s.price?.toLocaleString("en-IN")} • {s.duration}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleEdit(s)}
                className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
                title="Edit Service"
              >
                <Pencil size={18} />
              </button>

              <button
                onClick={() => handleDelete(s._id)}
                className="p-2 rounded text-red-600 hover:bg-red-50 dark:hover:bg-red-900"
                title="Delete Service"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminServices;
