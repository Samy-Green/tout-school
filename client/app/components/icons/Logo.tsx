import CONFIG_NAMES from "../../constants/names";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CONFIG_COLORS from "../../constants/colors";

export const TSLogo = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
    <defs>
      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop
          offset="0%"
          stopColor={`${CONFIG_COLORS.primary.gradient_from}`}
        />
        <stop
          offset="100%"
          stopColor={`${CONFIG_COLORS.primary.gradient_to}`}
        />
      </linearGradient>
    </defs>
    <rect width="40" height="40" rx="10" fill="url(#logoGradient)" />
    <path d="M12 16h16v2H12v-2zm0 4h12v2H12v-2zm0 4h16v2H12v-2z" fill="white" />
    <circle cx="30" cy="12" r="2" fill="rgba(255,255,255,0.8)" />
  </svg>
);

export function LogoWithName() {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
      <TSLogo />
      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          fontSize: "1.2rem",
          background: `linear-gradient(45deg, ${CONFIG_COLORS.primary.gradient_from}, ${CONFIG_COLORS.primary.gradient_to})`,
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        {CONFIG_NAMES.appName}
      </Typography>
    </Box>
  );
}

export default TSLogo;
