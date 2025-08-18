import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TSLogo from "./icons/Logo";

// Composant Logo SVG

export default function LogoWithName() {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2, p: 0 }}>
      <TSLogo size={32} />
      <Typography variant="h6" sx={{ fontWeight: 600 }}>
        Tout School
      </Typography>
    </Box>
  );
}
