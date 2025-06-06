'use client';

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {subjects} from "@/constants";
import {useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import {formUrlQuery, removeKeysFromUrlQuery} from "@jsmastery/utils";
import {router} from "next/client";


const formSchema = z.object({
    subject: z.string().min(1, { message: 'Subject is required.'}),
})

const SubjectFilter = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            subject:'',
        },
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values)
    }

    const searchParams = useSearchParams();
    const query = searchParams.get("subject") || "";

    const [subject, setSubject] = useState('');

    useEffect(() =>{
        let newUrl = "";
        if (subject === 'all') {
            newUrl = removeKeysFromUrlQuery({
                params: searchParams.toString(),
                keysToRemove: ["subject"],
            });
        } else {
            newUrl = formUrlQuery({
                params: searchParams.toString(),
                key: "subject",
                value: subject,
            })
        }
    });
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                        <FormItem>
                                <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                    <SelectTrigger className="input capitalize">
                                        <SelectValue placeholder="Select the subject" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All subjects</SelectItem>
                                        {subjects.map((subject)=>(
                                            <SelectItem value={subject} key={subject} className="capitalize">
                                                {subject}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                        </FormItem>
                    )}
                />
            </form>

        </Form>

)
}
export default SubjectFilter
