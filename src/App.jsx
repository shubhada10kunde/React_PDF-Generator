import React, { useState } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import InsertChartOutlinedIcon from "@mui/icons-material/InsertChartOutlined";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import PDFReport from "./components/PDFReport";
import ChartImageGenerator from "./components/ChartImageGenerator";
import data from "./data/sample_data_Shubada.json";

function App() {
  const [niftyChart, setNiftyChart] = useState(null);
  const [bankniftyChart, setBankniftyChart] = useState(null);
  const [openPreview, setOpenPreview] = useState(false);

  const handleImageGenerated = (id, img) => {
    if (id === "nifty") setNiftyChart(img);
    if (id === "banknifty") setBankniftyChart(img);
  };

  const chartsReady = niftyChart && bankniftyChart;

  const pdfDocument = (
    <PDFReport
      data={data}
      charts={{ nifty: niftyChart, banknifty: bankniftyChart }}
    />
  );

  // chart generators
  const hiddenCharts = (
    <div style={{ position: "absolute", left: "-9999px" }}>
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
    </div>
  );

  return (
    <>
      {hiddenCharts}
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
          backgroundImage:
            "url('https://thumbs.dreamstime.com/t/financial-trade-increase-dark-blue-chart-stock-exchange-background-animation-video-k-resolution-financial-trade-increase-111682457.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          color: "white",
        }}
      >
        <Container maxWidth="sm">
          <Card
            elevation={5}
            sx={{
              bgcolor: "rgba(0, 0, 0, 0.6)",
              color: "#fff",
              borderRadius: 4,
              p: 2,
              boxShadow: "0 4px 100px rgba(0,0,0,0.5)",
              backdropFilter: "blur(4px)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <CardContent>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                gap={1}
                mb={2}
              >
                <InsertChartOutlinedIcon fontSize="large" />
                <Typography variant="h4" component="h1">
                  PDF Report Generator
                </Typography>
              </Box>

              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                gap={2}
                mt={4}
              >
                {chartsReady ? (
                  <>
                    <PDFDownloadLink
                      document={pdfDocument}
                      fileName="financial-report.pdf"
                      style={{ textDecoration: "none" }}
                    >
                      {({ loading }) => (
                        <Button variant="contained" color="primary">
                          {loading ? "Generating PDF..." : "Download PDF"}
                        </Button>
                      )}
                    </PDFDownloadLink>

                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => setOpenPreview(true)}
                    >
                      Preview PDF
                    </Button>
                  </>
                ) : (
                  <Typography variant="body2" color="gray">
                    Generating charts...
                  </Typography>
                )}
              </Box>
            </CardContent>
          </Card>
        </Container>
      </Box>

      {/* PDF Preview */}
      <Dialog
        open={openPreview}
        onClose={() => setOpenPreview(false)}
        fullWidth
        maxWidth="lg"
      >
        <DialogTitle>📄 PDF Preview</DialogTitle>
        <DialogContent dividers>
          <Box sx={{ height: "80vh" }}>
            <PDFViewer width="100%" height="100%">
              {pdfDocument}
            </PDFViewer>
          </Box>
        </DialogContent>

        {/* Close button */}
        <DialogActions>
          <Button
            onClick={() => setOpenPreview(false)}
            sx={{
              backgroundColor: "#d32f2f",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#b71c1c",
              },
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default App;
