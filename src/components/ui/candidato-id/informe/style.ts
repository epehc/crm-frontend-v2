
import { StyleSheet } from '@react-pdf/renderer';


// Create styles
export const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#fff',
        fontFamily: "Helvetica",
        fontSize: 11 ,
        padding: "30px 50px",
    },
    header:{
        width: "100%",
    },
    marginTop: {
        marginTop: 10,
        marginLeft: 100,
    },
    section: {
        margin: 10,
        padding: 10,
    },
    informe: {
        fontSize: 18,
        color: 'rgb(189, 0, 0)',
    },
    sectionHeader:{
        fontSize: 18,
        backgroundColor: 'rgb(189, 0, 0)',
        color: 'white',
        fontFamily: "Helvetica-Bold",
    },
    trabajoTableHeader: {
        backgroundColor: "rgb(223, 223, 223)",
        padding: 5,
        fontSize: 10,
        flexDirection: 'row',
        justifyContent: 'space-evenly', 
        alignItems: 'center',
        textAlign: 'center',
        width: '100%',
        flexWrap: 'nowrap',
        fontFamily: "Helvetica-Bold",
    },
    table: {
        width: "100%",
        borderWidth: 0,
        margin: "20px 0",
    },
    trabajoTable: {
        width: "100%",
        borderWidth: 0,
        marginBottom: "5px",
    },
    trabajoTd: {
        padding: 3,
        flexWrap: "wrap",
        fontSize: 10,
        flexBasis: "80%",
    },
    trabajoTdTitle:{
        backgroundColor: "rgb(223, 223, 223)",
        padding: 3,
        fontSize: 9,
        flexBasis: "20%",
        flexShrink: 0,
        fontFamily: "Helvetica-Bold",
    },
    tableHeader: {
        backgroundColor: "#e5e5e5",
    },
    informaciones:{
        padding: 3,
        flexWrap: "wrap",
        fontSize: 10,
    },
    td: {
        padding: 3,
        flexWrap: "wrap",
        fontSize: 10,
        flexBasis: "60%",
    },
    tdTitle:{
        backgroundColor: "rgb(223, 223, 223)",
        padding: 3,
        fontSize: 9,
        flexBasis: "40%",
        flexShrink: 0,
        fontFamily: "Helvetica-Bold",
    },
    tableHeaderRow:{
        backgroundColor: "rgb(223, 223, 223)",
        padding: 5,
        fontSize: 10,
        flexDirection: 'row',
        justifyContent: 'space-evenly', 
        alignItems: 'center',
        textAlign: 'center',
        width: '100%',
        flexWrap: 'nowrap',
        fontFamily: "Helvetica-Bold",
    },
    thCell: {
        flex: 1,            
        textAlign: 'center',
    },
    tdRow: {
        flexDirection: 'row',
        justifyContent: 'space-between', 
        width: '100%',
        flexWrap: 'wrap',
    },
    twoColumn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginVertical: 10,
    },
    column: {
        flex: 1,
        marginHorizontal: 5,
    },
    textCentered:{
        textAlign: 'center',
    },
    textNoSplit:{
        maxWidth: 150,
        textOverflow: 'ellipsis'
    }
});
