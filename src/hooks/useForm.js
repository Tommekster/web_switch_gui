import { useState } from "react";

export default function useForm(initialFormData) {
  const [formData, setFormData] = useState(initialFormData);
  const resetForm = () => {
    setFormData(initialFormData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return { formData, resetForm, handleChange };
}
