'use client'

import {styles} from './style';
import { Page, Text, View, Document, PDFViewer, Image, Font } from '@react-pdf/renderer';
import { Table, TD, TH, TR } from "@ag-media/react-pdf-table";
import { useCandidatoDataContext } from '@/contexts/useCandidatoDataContext';
import InformacionPersonalPDF from './informacion-personal';

// Create Document Component
export default function Informe() {

    const {data, informeTexts, empresa} = useCandidatoDataContext();

    const fecha = new Date().toLocaleDateString('es-GT', { year: 'numeric', month: 'long', day: 'numeric' });

    // Hyphenation callback to prevent words from being split
    Font.registerHyphenationCallback((word: string): string[] => [word]);

    const InformePDF = () => (
        <Document>
            <Page size="LETTER" style={styles.page}>
                <View style={styles.twoColumn}>
                    <View style={styles.column}>
                        <Image src="/logo.png" />
                    </View>
                    <View style={[styles.column, styles.textCentered, styles.marginTop]}>
                        <Text style={styles.informe}>INFORME DE</Text>
                        <Text style={styles.informe}>CANDIDATO/A</Text>
                    </View>
                </View>
                <View style={{marginBottom: 20}}>
                    <View>
                        <Text>Puesto al que aplica: {data?.candidato?.puesto_aplicado}</Text>
                        <Text>Empresa a la que aplica: {empresa} </Text>
                        <Text>Fecha de Informe: {fecha}</Text>
                    </View>
                    
                </View>
                {/* Informacion Personal */}
                <InformacionPersonalPDF candidato={data?.candidato} informacionPersonal={data?.informacionPersonal} residencia={data?.residencia} vicios={data?.vicios} mobilidad={data?.mobilidad} />
                {/* Estudios */}
                <View>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.textCentered}>ESTUDIOS</Text>
                    </View>
                    <Table style={styles.trabajoTable}>
                        <TR style={styles.tableHeaderRow}>
                            <TH style={styles.thCell}><Text>Institución</Text></TH>
                            <TH style={styles.thCell}><Text>Título</Text></TH>
                            <TH style={styles.thCell}><Text>Último grado cursado:</Text></TH>
                        </TR>
                        {data?.estudios.map(estudio => (
                            <TR key={estudio.id}>
                                <TD style={styles.td}>{estudio.institucion}</TD>
                                <TD style={styles.td}>{estudio.titulo}</TD>
                                <TD style={styles.td}>{estudio.grado}</TD>
                            </TR>
                        ))}
                    </Table>
                </View>
            </Page>
            <Page size="LETTER" style={styles.page}>
                {/* Experiencia Laboral */}
                <View>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.textCentered}>INFORMACIÓN LABORAL</Text>
                    </View>
                    {data?.experienciaLaboral.map(experiencia => (
                        <View key={experiencia.id}>
                            <Text style={[styles.trabajoTableHeader,styles.textCentered]}>{experiencia.puesto}</Text>
                            <Table style={styles.trabajoTable}>
                                <TR>
                                    <TD style={[styles.tdTitle]}>Nombre empresa:</TD>
                                    <TD style={styles.td}>{experiencia.empresa}</TD>
                                    <TD style={[styles.tdTitle]}>Motivo salida:</TD>
                                    <TD style={styles.td}>{experiencia.motivo_salida}</TD>
                                </TR>
                                <TR>
                                    <TD style={[styles.tdTitle]}>Fecha de inicio:</TD>
                                    <TD style={styles.td}>{experiencia.fecha_inicio}</TD>
                                    <TD style={[styles.tdTitle]}>Fecha de fin:</TD>
                                    <TD style={styles.td}>{experiencia.fecha_fin}</TD>
                                </TR>
                                <TR>
                                    <TD style={[styles.trabajoTdTitle]}>Responsabilidades y actividades principales:</TD>
                                    <TD style={styles.trabajoTd}>{experiencia.responsabilidades}</TD>
                                </TR>
                            </Table>
                        </View>
                    ))}
                </View>
                <View>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.textCentered}>DESENVOLVIMIENTO E INFORMACIÓN ADICIONAL</Text>
                    </View>
                    <Text style={styles.informaciones}>{informeTexts?.desenvolvimiento}</Text>
                </View>
                <View>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.textCentered}>REFERENCIAS LABORALES</Text>
                    </View>
                    <Text style={styles.informaciones}>{informeTexts?.referencias}</Text>
                </View>
            </Page>
        </Document>
    );

    return (
        <div className="w-full h-full">
            <PDFViewer width={'100%'} height={'100%'}>
                <InformePDF />
            </PDFViewer>
        </div>
    );
}