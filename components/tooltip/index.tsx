import { Tooltip as TooltipComponent } from "flowbite-react";

export default function Tooltip({ content = "Tooltip content", children }: { content: string, children: React.ReactNode }) {

    return (
        <TooltipComponent
            content={content}
            animation="duration-1000"
        >
            {
                children
            }
        </TooltipComponent>
    )
}