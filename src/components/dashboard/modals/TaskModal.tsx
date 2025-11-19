import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  TASK_PRIORITY,
  type ITaskPayload,
  type ITaskResponse,
} from "../../../interface";
import { FormikInput } from "../../formik";
import { Button } from "../../ui";
import { FormikSelect } from "../../formik/FormikSelect";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: ITaskPayload) => void;
  mode?: "create" | "update";
  initialTask?: ITaskResponse | null;
}

export const TaskModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSubmit,
  mode = "create",
  initialTask,
}) => {
  if (!isOpen) return null;

  const initialValues: ITaskPayload = {
    title: mode === "update" ? initialTask?.title! : "",
    description: mode === "update" ? initialTask?.description! : "",
    priority: mode === "update" ? initialTask?.priority! : TASK_PRIORITY.LOW,
    endDate: initialTask?.endDate?.split("T")[0] ?? "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required."),
    description: Yup.string().optional(),
    priority: Yup.mixed()
      .oneOf(Object.values(TASK_PRIORITY))
      .required("Priority is required."),
    endDate: Yup.date().required("End date is required."),
  });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {mode === "update" ? "Edit Task" : "Create Task"}
        </h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            await onSubmit(values);
            setSubmitting(false);
            onClose();
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <FormikInput
                name="title"
                label="Title"
                placeholder="Task title"
              />
              <FormikInput
                name="description"
                label="Description"
                type="text"
                placeholder="Task description"
              />
              <FormikSelect name="priority" label="Priority">
                {Object.values(TASK_PRIORITY).map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </FormikSelect>

              <FormikInput name="endDate" label="End Date" type="date" />

              <div className="flex justify-end gap-2 mt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {mode === "update" ? "Update" : "Create"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
