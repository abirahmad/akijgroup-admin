import Button from "@/components/button";
import Tooltip from "@/components/tooltip"; // Ensure this path is correct

interface IDeleteIconButton {
    onClick: () => void;
}

interface IDeleteIconButtonTooltip extends IDeleteIconButton {
    tooltipTitle: string; // Corrected the typo here
}

export function DeleteIconButton({ onClick }: IDeleteIconButton) {
    return (
        <Button
            variant='danger'
            customClass="p-1 rounded-md inline mr-1"
            onClick={onClick}
        >
            <i className='bi bi-trash'></i>
        </Button>
    );
}

export function DeleteIconButtonTooltip({ onClick, tooltipTitle }: IDeleteIconButtonTooltip) {
    return (
        <Tooltip content={tooltipTitle}>
            <DeleteIconButton onClick={onClick} />
        </Tooltip>
    );
}
