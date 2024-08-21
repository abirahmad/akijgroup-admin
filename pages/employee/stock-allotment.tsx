import PrivateRoute from "@/components/_utlities/privateRoute";
import EmployeeStampStockAllocateForm from "@/components/stamp-stocks/EmployeeStampAllocateForm";
import { useRouter } from "next/router";

export default function EmployeeStampStockAllotmentPage() {
    const router = useRouter()
    const { employee_id } = router.query;

    return (
        <PrivateRoute permission="stamps.allocate">
            <EmployeeStampStockAllocateForm
                employeeId={parseInt(employee_id + '')}
            />
        </PrivateRoute>
    );
}
