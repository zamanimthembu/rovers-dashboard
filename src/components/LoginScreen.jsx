import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  IconButton,
  InputAdornment,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { login } from "../services/auth";

export default function LoginScreen({ onLogin }) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [shaking, setShaking] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (login(password)) {
      onLogin();
    } else {
      setError(true);
      setShaking(true);
      setPassword("");
      setTimeout(() => setShaking(false), 500);
    }
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage:
          "radial-gradient(circle at top, rgba(22, 59, 122, 0.28), transparent 40%), linear-gradient(180deg, #0b1f4d 0%, #08162f 100%)",
        px: 2,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 400,
          p: { xs: 3.5, sm: 5 },
          bgcolor: "#0d1830",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 3,
          boxShadow: "0 32px 64px rgba(0,0,0,0.4)",
          animation: shaking ? "shake 0.4s ease" : "none",
          "@keyframes shake": {
            "0%, 100%": { transform: "translateX(0)" },
            "20%":       { transform: "translateX(-8px)" },
            "40%":       { transform: "translateX(8px)" },
            "60%":       { transform: "translateX(-6px)" },
            "80%":       { transform: "translateX(6px)" },
          },
        }}
      >
        {/* Branding */}
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 4 }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2,
              bgcolor: "primary.main",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 2,
              boxShadow: "0 8px 24px rgba(198,40,40,0.35)",
            }}
          >
            <Typography sx={{ color: "#fff", fontWeight: 900, fontSize: "1rem", letterSpacing: 0.5 }}>
              CR
            </Typography>
          </Box>

          <Typography
            sx={{
              fontWeight: 800,
              fontSize: "1.15rem",
              color: "#f7f9fc",
              textAlign: "center",
              letterSpacing: -0.3,
              lineHeight: 1.2,
            }}
          >
            College Rovers
            <br />
            Performance Analytics
          </Typography>

          <Typography
            sx={{
              fontSize: "0.75rem",
              color: "#5a7aaa",
              mt: 0.75,
              fontWeight: 600,
              letterSpacing: 1,
              textTransform: "uppercase",
            }}
          >
            Secure analyst access
          </Typography>
        </Box>

        {/* Form */}
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            type={showPassword ? "text" : "password"}
            label="Password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(false); }}
            fullWidth
            size="small"
            autoFocus
            InputLabelProps={{ sx: { color: "#5a7aaa" } }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((v) => !v)}
                    edge="end"
                    size="small"
                    sx={{ color: "#5a7aaa" }}
                  >
                    {showPassword ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                color: "#f7f9fc",
                bgcolor: "rgba(255,255,255,0.04)",
                "& fieldset": { borderColor: error ? "rgba(198,40,40,0.6)" : "rgba(255,255,255,0.1)" },
                "&:hover fieldset": { borderColor: error ? "rgba(198,40,40,0.8)" : "rgba(255,255,255,0.2)" },
                "&.Mui-focused fieldset": { borderColor: error ? "#c62828" : "rgba(198,40,40,0.6)" },
              },
            }}
          />

          {error && (
            <Alert
              severity="error"
              sx={{
                bgcolor: "rgba(198,40,40,0.1)",
                color: "#ef9a9a",
                border: "1px solid rgba(198,40,40,0.25)",
                borderRadius: 2,
                fontSize: "0.82rem",
                py: 0.5,
              }}
            >
              Incorrect password. Please try again.
            </Alert>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={!password}
            sx={{
              mt: 0.5,
              bgcolor: "primary.main",
              fontWeight: 700,
              fontSize: "0.9rem",
              borderRadius: 2,
              textTransform: "none",
              letterSpacing: 0.2,
              py: 1.1,
              boxShadow: "0 4px 16px rgba(198,40,40,0.3)",
              "&:hover": { bgcolor: "#d32f2f", boxShadow: "0 6px 20px rgba(198,40,40,0.4)" },
              "&.Mui-disabled": { bgcolor: "rgba(198,40,40,0.25)", color: "rgba(255,255,255,0.3)" },
            }}
          >
            Sign In
          </Button>
        </Box>

        {/* Footer note */}
        <Typography
          sx={{
            mt: 3.5,
            fontSize: "0.7rem",
            color: "#2d4060",
            textAlign: "center",
            letterSpacing: 0.2,
          }}
        >
          For authorised coaching and analysis staff only
        </Typography>
      </Paper>
    </Box>
  );
}
