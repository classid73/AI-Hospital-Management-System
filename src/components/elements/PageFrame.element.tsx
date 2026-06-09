import { Box } from "@mui/material";
import { motion } from "framer-motion";
import type { IReactNode } from "typescript/interfaces";
export const PageFrame_Element = ({ children }: IReactNode) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 1680,
            mx: "auto",
            px: { xs: 2, md: 3 },
            py: { xs: 2, md: 3 },
            pb: 8,
          }}
        >
          {children}
        </Box>
      </motion.div>
    </>
  );
};

export default PageFrame_Element;
