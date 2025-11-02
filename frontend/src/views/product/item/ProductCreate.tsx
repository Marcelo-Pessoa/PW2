"use client";

import { FormEvent, useState } from "react";
import { Button } from "flowbite-react";
import { useRouter } from "next/navigation";

import TextInput from "@/components/form/TextInput/TextInput";
import Textarea from "@/components/form/Textarea/Textarea";
import NumberInput from "@/components/form/NumberInput/NumberInput";

import { CreateProductDto } from "../Product.types";
import productSchema from "../Product.schema";

function ProductCreate() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("0.00");
  const [stock, setStock] = useState(0);
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const product: CreateProductDto = {
      name,
      price,
      stock,
      description,
    };
  
    const { error } = productSchema.validate(product, { abortEarly: false })
    if(error) {
      const errorsDetails: Record<string, string> = {}

      for(const errorDetail of error.details){
        errorsDetails[errorDetail.path[0]] = errorDetail.message 
      }

      setErrors(errorsDetails);
    }else{
    
    fetch(`${process.env.NEXT_PUBLIC_API}/product`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(product),
    })
      .then((res) => res.json())
      .then(() => {
        router.push("/");
      });
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-2">Criação de Produto</h1>
      <form method="POST" onSubmit={handleSubmit} className="flex max-w-md flex-col gap-4">
        <TextInput
          value={name}
          onChange={setName}
          error={errors['name']}
          name="name"
          label="Nome"
        />
        <TextInput
          value={price}
          onChange={setPrice}
          error={errors['price']}
          name="price"
          label="Preço"
        />
        <NumberInput
          value={stock}
          onChange={setStock}
          error={errors['stock']}
          name="stock"
          label="Estoque"
        />
        <Textarea
          value={description}
          onChange={setDescription}
          error={errors['description']}
          name="description"
          label="Descrição"
        />
        <Button type="submit">Enviar</Button>
      </form>
    </>
  );
}
