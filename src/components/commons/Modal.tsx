import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { ReactElement } from "react";

interface CustomModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  handleModalBody: () => ReactElement;
  width?: string | number;
}

const CustomModal: React.FC<CustomModalProps> = ({
  open,
  onClose,
  title,
  handleModalBody,
  width = "500px",
}) => {
  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth={false}
        slotProps={{
          paper: {
            sx: {
              width: width,
              borderRadius: "20px",
              background:
                "linear-gradient(135deg, rgba(20,10,40,0.95), rgba(5,2,15,0.95))",
              border: "1px solid rgba(124,77,255,0.2)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 0 40px rgba(124,77,255,0.25)",
              color: "#fff",
            },
          },
        }}
      >
        {title && (
          <DialogTitle
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: "14px",
              letterSpacing: "1.5px",
              color: "rgba(255,255,255,0.6)",
            }}
          >
            {title}
            <IconButton onClick={onClose} sx={{ color: "#aaa" }}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
        )}
        {/* CONTENT */}
        <DialogContent>{handleModalBody()}</DialogContent>
      </Dialog>
    </>
  );
};

export default CustomModal;
