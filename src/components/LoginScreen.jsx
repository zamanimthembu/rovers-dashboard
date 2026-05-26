import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { login, getStakeholderAccounts } from "../services/auth";

const STAKEHOLDER_ACCOUNTS = getStakeholderAccounts();

export default function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [shaking, setShaking] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (login(email, password)) {
      onLogin();
    } else {
      setError(true);
      setShaking(true);
      setPassword("");
      setTimeout(() => setShaking(false), 500);
    }
  }

  function clearError() {
    setError(false);
  }

  const fieldSx = (hasError) => ({
    "& .MuiOutlinedInput-root": {
      color: "#f7f9fc",
      bgcolor: "rgba(255,255,255,0.04)",
      "& fieldset": { borderColor: hasError ? "rgba(198,40,40,0.6)" : "rgba(255,255,255,0.1)" },
      "&:hover fieldset": { borderColor: hasError ? "rgba(198,40,40,0.8)" : "rgba(255,255,255,0.2)" },
      "&.Mui-focused fieldset": { borderColor: hasError ? "#c62828" : "rgba(198,40,40,0.6)" },
    },
  });

  return (
    <>
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
            maxWidth: 420,
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
                width: 52,
                height: 52,
                borderRadius: 2,
                bgcolor: "primary.main",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 2,
                boxShadow: "0 8px 24px rgba(198,40,40,0.35)",
              }}
            >
              <Typography sx={{ color: "#fff", fontWeight: 900, fontSize: "1.05rem", letterSpacing: 0.5 }}>
                CR
              </Typography>
            </Box>

            <Typography
              sx={{
                fontWeight: 800,
                fontSize: "1.2rem",
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
                fontSize: "0.72rem",
                color: "#5a7aaa",
                mt: 0.75,
                fontWeight: 600,
                letterSpacing: 1,
                textTransform: "uppercase",
              }}
            >
              Secure stakeholder access
            </Typography>
          </Box>

          {/* Form */}
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              type="email"
              label="Email"
              name="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); clearError(); }}
              fullWidth
              size="small"
              autoFocus
              autoComplete="username"
              InputLabelProps={{ sx: { color: "#5a7aaa" } }}
              sx={fieldSx(error)}
            />

            <TextField
              type={showPassword ? "text" : "password"}
              label="Password"
              name="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); clearError(); }}
              fullWidth
              size="small"
              autoComplete="current-password"
              InputLabelProps={{ sx: { color: "#5a7aaa" } }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((v) => !v)}
                      edge="end"
                      size="small"
                      sx={{ color: "#5a7aaa" }}
                      tabIndex={-1}
                    >
                      {showPassword
                        ? <VisibilityOffIcon fontSize="small" />
                        : <VisibilityIcon fontSize="small" />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={fieldSx(error)}
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
                The email or password is incorrect. Please check the stakeholder
                details provided to you, or{" "}
                <Box
                  component="span"
                  onClick={() => setHelpOpen(true)}
                  sx={{
                    textDecoration: "underline",
                    cursor: "pointer",
                    color: "#ef9a9a",
                  }}
                >
                  see login help
                </Box>
                .
              </Alert>
            )}

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={!email || !password}
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

          {/* Need help link */}
          <Box sx={{ mt: 2.5, textAlign: "center" }}>
            <Button
              startIcon={<HelpOutlineIcon sx={{ fontSize: "0.95rem !important" }} />}
              onClick={() => setHelpOpen(true)}
              size="small"
              sx={{
                color: "#3d5a80",
                fontSize: "0.75rem",
                textTransform: "none",
                fontWeight: 500,
                "&:hover": { color: "#8baacf", bgcolor: "transparent" },
              }}
            >
              Need help signing in?
            </Button>
          </Box>

          {/* Footer note */}
          <Typography
            sx={{
              mt: 1.5,
              fontSize: "0.68rem",
              color: "#2d4060",
              textAlign: "center",
              lineHeight: 1.6,
            }}
          >
            For authorised College Rovers coaching, analysis, player feedback,
            management, and academic review stakeholders only.
          </Typography>
        </Paper>
      </Box>

      {/* Login help dialog */}
      <Dialog
        open={helpOpen}
        onClose={() => setHelpOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: "#0d1830",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 3,
            boxShadow: "0 32px 64px rgba(0,0,0,0.5)",
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "#f7f9fc",
            fontWeight: 700,
            fontSize: "1rem",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            pb: 2,
          }}
        >
          Login Help
          <IconButton
            onClick={() => setHelpOpen(false)}
            size="small"
            aria-label="Close help"
            sx={{
              color: "rgba(255,255,255,0.4)",
              "&:hover": { color: "#f7f9fc", bgcolor: "rgba(255,255,255,0.06)" },
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ pt: 2.5, pb: 3 }}>
          <Stack spacing={2.5}>
            {/* About access */}
            <Box>
              <Typography sx={{ fontSize: "0.82rem", color: "#8baacf", lineHeight: 1.7 }}>
                This dashboard is currently in{" "}
                <Box component="span" sx={{ color: "#f7f9fc", fontWeight: 600 }}>
                  stakeholder preview mode
                </Box>
                . Users do not register themselves — access is provided using
                dedicated stakeholder credentials shared directly by the project owner.
              </Typography>
            </Box>

            <Divider sx={{ borderColor: "rgba(255,255,255,0.06)" }} />

            {/* Stakeholder accounts */}
            <Box>
              <Typography
                sx={{
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  color: "#5a7aaa",
                  letterSpacing: 0.8,
                  textTransform: "uppercase",
                  mb: 1.5,
                }}
              >
                Authorised stakeholder roles
              </Typography>
              <Stack spacing={1.25}>
                {STAKEHOLDER_ACCOUNTS.map((account) => (
                  <Box
                    key={account.email}
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 1.5,
                      p: 1.5,
                      borderRadius: 2,
                      border: "1px solid rgba(255,255,255,0.06)",
                      bgcolor: "rgba(255,255,255,0.02)",
                    }}
                  >
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                        <Typography sx={{ fontSize: "0.85rem", fontWeight: 700, color: "#f7f9fc" }}>
                          {account.name}
                        </Typography>
                        <Chip
                          label={account.role}
                          size="small"
                          sx={{
                            fontSize: "0.65rem",
                            fontWeight: 600,
                            height: 18,
                            bgcolor: "rgba(198,40,40,0.12)",
                            color: "#c47f7f",
                            border: "1px solid rgba(198,40,40,0.2)",
                          }}
                        />
                      </Stack>
                      <Typography sx={{ fontSize: "0.75rem", color: "#5a7aaa", mt: 0.4 }}>
                        {account.email}
                      </Typography>
                      <Typography sx={{ fontSize: "0.75rem", color: "#4a6a8a", mt: 0.25 }}>
                        {account.purpose}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Stack>
            </Box>

            <Divider sx={{ borderColor: "rgba(255,255,255,0.06)" }} />

            {/* Contact */}
            <Box
              sx={{
                p: 1.75,
                borderRadius: 2,
                bgcolor: "rgba(22,59,122,0.15)",
                border: "1px solid rgba(22,59,122,0.25)",
              }}
            >
              <Typography sx={{ fontSize: "0.82rem", color: "#8baacf", lineHeight: 1.7 }}>
                If your credentials are not working, your login details may not have
                been set up yet. Please contact the{" "}
                <Box component="span" sx={{ color: "#f7f9fc", fontWeight: 600 }}>
                  project owner, Zamani Mthembu
                </Box>
                , for access.
              </Typography>
            </Box>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
}
