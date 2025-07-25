// src/components/PDFReport.jsx
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { format } from "date-fns";

const styles = StyleSheet.create({
  page: {
    padding: 24,
    fontSize: 11,
    fontFamily: "Helvetica",
    backgroundColor: "#ffffff",
    color: "#111",
    position: "relative",
  },
  header: {
    position: "absolute",
    top: 10,
    left: 24,
    right: 24,
    fontSize: 10,
    color: "#888",
    textAlign: "center",
  },
  footer: {
    position: "absolute",
    bottom: 10,
    left: 24,
    right: 24,
    fontSize: 10,
    color: "#888",
    textAlign: "center",
  },
  section: {
    marginBottom: 12,
    padding: 10,
    borderRadius: 4,
  },
  lightGray: {
    backgroundColor: "#f1f1f1",
    border: "1 solid #ccc",
  },
  lightBlue: {
    backgroundColor: "#e3f2fd",
    border: "1 solid #90caf9",
  },
  lightGreen: {
    backgroundColor: "#e8f5e9",
    border: "1 solid #81c784",
  },
  heading: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#1a237e",
    borderBottom: "1 solid #bbb",
    paddingBottom: 4,
  },
  subheading: {
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 6,
    marginBottom: 4,
    color: "#424242",
  },
  text: {
    fontSize: 10,
    marginBottom: 2,
    lineHeight: 1.5,
  },
  image: {
    width: "100%",
    height: 180,
    marginVertical: 10,
    border: "1 solid #ccc",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  column: {
    width: "48%",
  },
});

const PDFReport = ({ data, charts }) => (
  <Document>
    {/* PAGE 1 */}
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>
        Generated at: {format(new Date(data.generated_at), "PPpp")}
      </Text>
      <Text style={styles.footer}>Page 2</Text>

      <View style={[styles.section, styles.lightGray]}>
        <Text style={styles.heading}>US Indices</Text>
        {Object.entries(data.us_indices).map(([key, val]) => (
          <Text key={key} style={styles.text}>
            {key}: {val.value} ({val.change}%)
          </Text>
        ))}
      </View>

      <View style={[styles.section, styles.lightBlue]}>
        <Text style={styles.heading}>China Indices</Text>
        {Object.entries(data.china_indices).map(([key, val]) => (
          <Text key={key} style={styles.text}>
            {key}: {val.value} ({val.change}%)
          </Text>
        ))}
      </View>

      <View style={[styles.section, styles.lightGreen]}>
        <Text style={styles.heading}>Commodity Data</Text>
        {Object.entries(data.commodity_data).map(([key, val]) => (
          <Text key={key} style={styles.text}>
            {key}: {val.value} ({val.change}%)
          </Text>
        ))}
      </View>

      <View style={[styles.section, styles.lightGray]}>
        <Text style={styles.heading}>News Summary</Text>
        {Object.entries(data.news_summary).map(([topic, items]) => (
          <View key={topic} style={{ marginBottom: 4 }}>
            <Text style={styles.subheading}>{topic}</Text>
            {items.map((item, i) => (
              <Text key={i} style={styles.text}>
                - {item.title} ({item.source})
              </Text>
            ))}
          </View>
        ))}
      </View>
    </Page>

    {/* PAGE 2 */}
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>Daily Financial Report</Text>
      <Text style={styles.footer}>Page 2</Text>

      <View style={[styles.section, styles.lightBlue]}>
        <Text style={styles.heading}>Sectoral Indices</Text>
        {Object.entries(data.sectoral_indices).map(([key, val]) => (
          <Text key={key} style={styles.text}>
            {key}: {val.value} ({val.change}, {val.percent_change}%)
          </Text>
        ))}
      </View>

      <View style={[styles.section, styles.lightGray]}>
        <Text style={styles.heading}>NIFTY50 Movers</Text>
        <Text style={styles.subheading}>Gainers</Text>
        {data.nifty50_movers.gainers.map((item, i) => (
          <Text key={i} style={styles.text}>
            {item.symbol}: {item.last_price} ({item.change_pct}%)
          </Text>
        ))}
        <Text style={styles.subheading}>Losers</Text>
        {data.nifty50_movers.losers.map((item, i) => (
          <Text key={i} style={styles.text}>
            {item.symbol}: {item.last_price} ({item.change_pct}%)
          </Text>
        ))}
      </View>

      <View style={[styles.section, styles.lightGreen]}>
        <Text style={styles.heading}>India Indices</Text>
        {Object.entries(data.india_indices).map(([key, val]) => (
          <Text key={key} style={styles.text}>
            {key}: {val.value} ({val.change}%)
          </Text>
        ))}
      </View>

      <View style={[styles.section, styles.lightGray]}>
        <Text style={styles.heading}>Index Stats</Text>
        {Object.entries(data.index_stats).map(([key, val]) => (
          <View key={key} style={{ marginBottom: 6 }}>
            <Text style={styles.subheading}>{key}</Text>
            <View style={styles.row}>
              <Text style={styles.text}>R1: {val.r1}</Text>
              <Text style={styles.text}>R2: {val.r2}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.text}>S1: {val.s1}</Text>
              <Text style={styles.text}>S2: {val.s2}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.text}>EMA(5): {val.ema5}</Text>
              <Text style={styles.text}>EMA(20): {val.ema20}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.text}>Close: {val.close}</Text>
              <Text style={styles.text}>Trend: {val.trend}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={[styles.section, styles.lightBlue]}>
        <Text style={styles.heading}>NIFTY YTD Return</Text>
        <Text style={styles.text}>{data.nifty_ytd_return}%</Text>
      </View>
      <View style={[styles.section, styles.lightBlue]}>
        <Text style={styles.heading}>India VIX</Text>
        <Text style={styles.text}>
          {data.india_vix.value} ({data.india_vix.change})
        </Text>
      </View>
    </Page>

    {/* PAGE 3 – CHARTS */}
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>Daily Financial Report</Text>
      <Text style={styles.footer}>Page 3</Text>

      <View style={[styles.section, styles.lightGray]}>
        <Text style={styles.heading}>NIFTY 10D OHLC Chart</Text>
        {charts.nifty ? (
          <Image src={charts.nifty} style={styles.image} />
        ) : (
          <Text>Chart not available</Text>
        )}
      </View>
      <View style={[styles.section, styles.lightGray]}>
        <Text style={styles.heading}>BANKNIFTY 10D OHLC Chart</Text>
        {charts.banknifty ? (
          <Image src={charts.banknifty} style={styles.image} />
        ) : (
          <Text>Chart not available</Text>
        )}
      </View>
    </Page>
  </Document>
);

export default PDFReport;
