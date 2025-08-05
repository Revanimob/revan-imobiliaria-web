import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
}

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description = "Tem certeza que deseja continuar?",
  confirmText = "Confirmar",
  cancelText = "Cancelar",
}: ConfirmDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-wine text-xl">{title}</DialogTitle>
        </DialogHeader>

        <p className="text-gray-700">{description}</p>

        <DialogFooter className="mt-4 flex gap-2 justify-end">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-wine text-wine hover:bg-wine hover:text-white"
          >
            {cancelText}
          </Button>
          <Button
            onClick={onConfirm}
            className="bg-wine text-white hover:bg-wine-dark"
          >
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
