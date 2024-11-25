'use client'

import { yupResolver } from "@hookform/resolvers/yup";
import { Mutation_AttributeCatalog } from "../Tanstack_Query/Attribute_catalog/Query_attribute_catalog"
import { useForm } from 'react-hook-form';
import { schemaValidateAttributeCatalog } from "../../(Auth)/validate";

export default function useFormAttributeCatalog(mode: any) {
    const form_attributeCatalog = useForm({
        resolver: yupResolver(schemaValidateAttributeCatalog)
    });
    const { errors: errorsForm } = form_attributeCatalog.formState
    const { mutate, ...rest } = Mutation_AttributeCatalog(mode);
    const onSubmit = (dataForm: any) => {
        mutate(dataForm);
    }
    return { form_attributeCatalog, onSubmit, errorsForm, ...rest }
}
