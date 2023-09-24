import * as yup from "yup";

export const createEventSchema: yup.AnyObjectSchema = yup
  .object()
  .shape({
    name: yup.string().trim().required("Esse campo é obrigatório"),
    description: yup.string().trim().required("Esse campo é obrigatório"),
    link: yup.string().trim().required("Esse campo é obrigatório"),
    modalities: yup.string().trim().required("Esse campo é obrigatório"),
    paymentType: yup.string().trim().required("Esse campo é obrigatório"),
    address: yup.string().trim().required("Esse campo é obrigatório"),
    date: yup.date().required("Esse campo é obrigatório"),
  })
  .required();

export const updateEventSchema: yup.AnyObjectSchema = yup
  .object()
  .shape({
    id: yup.string().trim().required("Esse campo é obrigatório"),
    name: yup.string().trim().required("Esse campo é obrigatório"),
    description: yup.string().trim().required("Esse campo é obrigatório"),
    link: yup.string().trim().required("Esse campo é obrigatório"),
    modalities: yup.string().trim().required("Esse campo é obrigatório"),
    paymentType: yup.string().trim().required("Esse campo é obrigatório"),
    address: yup.string().trim().required("Esse campo é obrigatório"),
    date: yup.date().required("Esse campo é obrigatório"),
  })
  .required();
