import React, { useState } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
} from "@mui/material";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFReport from "./components/PDFReport";
import ChartImageGenerator from "./components/ChartImageGenerator";
import data from "./data/sample_data_Shubada.json";

function App() {
  const [niftyChart, setNiftyChart] = useState(null);
  const [bankniftyChart, setBankniftyChart] = useState(null);

  const handleImageGenerated = (id, img) => {
    if (id === "nifty") setNiftyChart(img);
    if (id === "banknifty") setBankniftyChart(img);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        color: "text.primary",
        px: 2,
      }}
    >
      <Container maxWidth="sm">
        <Card
          elevation={5}
          sx={{ bgcolor: "background.paper", color: "text.primary" }}
        >
          <CardContent>
            <Typography variant="h4" align="center" gutterBottom>
              📊 Financial PDF Report Generator
            </Typography>

            <Box
              display="flex"
              flexDirection="column"
              gap={3}
              alignItems="center"
            >
              {/* Chart generators */}
              <ChartImageGenerator
                chartId="nifty"
                title="NIFTY"
                data={data.nifty_10d_ohlc}
                onImageGenerated={handleImageGenerated}
              />
              <ChartImageGenerator
                chartId="banknifty"
                title="BANKNIFTY"
                data={data.banknifty_10d_ohlc}
                onImageGenerated={handleImageGenerated}
              />

              {/* PDF download */}
              <PDFDownloadLink
                document={
                  <PDFReport
                    data={data}
                    charts={{ nifty: niftyChart, banknifty: bankniftyChart }}
                  />
                }
                fileName="financial-report.pdf"
                style={{ textDecoration: "none" }}
              >
                {({ loading }) => (
                  <Button variant="contained" color="primary">
                    {loading ? "Generating PDF..." : "Download PDF"}
                  </Button>
                )}
              </PDFDownloadLink>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default App;
