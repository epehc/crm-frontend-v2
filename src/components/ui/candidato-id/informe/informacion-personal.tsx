import { Candidato, InformacionPersonal, Residencia, Vicios, Mobilidad } from "@/lib/definitions";
import { styles } from "./style";
import { Text, View } from '@react-pdf/renderer';
import { Table, TD, TR } from "@ag-media/react-pdf-table";

interface InformacionPersonalPDFProps {
    candidato: Candidato | null | undefined;
    informacionPersonal: InformacionPersonal | null | undefined;
    residencia: Residencia | null | undefined;
    vicios: Vicios | null | undefined;
    mobilidad: Mobilidad | null | undefined;
}


export default function InformacionPersonalPDF({candidato, informacionPersonal, residencia, vicios, mobilidad}: InformacionPersonalPDFProps) {

    return (
        <View>
            <View style={styles.sectionHeader}>
                <Text style={styles.textCentered}>INFORMACIÓN PERSONAL</Text>
            </View>`
            <Table style={styles.trabajoTable}>
                <TR>
                    <TD style={[styles.tdTitle]}>Nombre Completo:</TD>
                    <TD style={styles.td}>{candidato?.nombre}</TD>
                    <TD style={[styles.tdTitle]}>Otros idiomas que maneja:</TD>
                    <TD style={styles.td}>{informacionPersonal?.idiomas}</TD>
                    <TD style={[styles.tdTitle]}>Licencia de conducir:</TD>
                    <TD style={styles.td}>{mobilidad?.licencia}</TD>
                </TR>
                <TR>
                    <TD style={[styles.tdTitle]}>Género:</TD>
                    <TD style={styles.td}>{candidato?.genero}</TD>
                    <TD style={[styles.tdTitle]}>Religión:</TD>
                    <TD style={styles.td}>{informacionPersonal?.religion}</TD>
                    <TD style={[styles.td, styles.tdTitle]}>Posee vehículo propio:</TD>
                    <TD style={styles.td}>{mobilidad?.vehiculo}</TD>
                </TR>
                <TR>
                    <TD style={[styles.tdTitle]}>Estado civil:</TD>
                    <TD style={styles.td}>{informacionPersonal?.estado_civil}</TD>
                    <TD style={[styles.tdTitle]}>Vive con:</TD>
                    <TD style={styles.td}>{residencia?.vive_con}</TD>
                    <TD style={[styles.tdTitle]}>Tipo de Licencia:</TD>
                    <TD style={styles.td}>{mobilidad?.licencia_tipo}</TD>
                </TR>
                <TR>
                    <TD style={[styles.tdTitle]}>Nacionalidad:</TD>
                    <TD style={styles.td}>{informacionPersonal?.nacionalidad}</TD>
                    <TD style={[styles.tdTitle]}>País de residencia:</TD>
                    <TD style={styles.td}>{residencia?.pais_de_residencia}</TD>
                    <TD style={[styles.tdTitle]}>Cantidad de años conduciendo:</TD>
                    <TD style={styles.td}>{mobilidad?.tiempo_conduciendo}</TD>
                </TR>
                <TR>
                    <TD style={[styles.tdTitle]}>Puede viajar al interior:</TD>
                    <TD style={styles.td}>{mobilidad?.viaje_interior}</TD>
                    <TD style={[styles.tdTitle]}>Puede viajar al exterior:</TD>
                    <TD style={styles.td}>{mobilidad?.viaje_exterior}</TD>
                    <TD style={[styles.tdTitle]}>Tipo de Transporte y Modelo:</TD>
                    <TD style={styles.td}>{mobilidad?.vehiculo_tipo} {mobilidad?.vehiculo_modelo}</TD>
                </TR>
                <TR>
                    <TD style={[styles.tdTitle]}>Zona que vive:</TD>
                    <TD style={styles.td}>{residencia?.zona}</TD>
                    <TD style={[styles.tdTitle]}>Municipio:</TD>
                    <TD style={styles.td}>{residencia?.municipio}</TD>
                    <TD style={[styles.tdTitle]}>Departamento:</TD>
                    <TD style={styles.td}>{residencia?.departamento}</TD>
                </TR>
                <TR>
                    <TD style={[styles.tdTitle]}>Partido político:</TD>
                    <TD style={styles.td}>{informacionPersonal?.partido_politico}</TD>
                    <TD style={[styles.tdTitle]}>Sindicato:</TD>
                    <TD style={styles.td}>{informacionPersonal?.sindicato}</TD>
                    <TD style={[styles.tdTitle]}>Aspiración Salarial:</TD>
                    <TD style={styles.td}>{candidato?.aspiracion_salarial}</TD>
                </TR>
                <TR>
                    <TD style={[styles.tdTitle]}>Fuma:</TD>
                    <TD style={styles.td}>{vicios?.fuma}</TD>
                    <TD style={[styles.tdTitle]}>Cuánto fuma:</TD>
                    <TD style={styles.td}></TD>
                    <TD style={[styles.tdTitle]}>Edad:</TD>
                    <TD style={styles.td}>{informacionPersonal?.edad}</TD>
                </TR>
                <TR>
                    <TD style={[styles.tdTitle]}>Bebidas alcohólicas:</TD>
                    <TD style={styles.td}>{vicios?.alcohol}</TD>
                    <TD style={[styles.tdTitle]}>Frecuencia bebida:</TD>
                    <TD style={styles.td}>{vicios?.alcohol_frecuencia}</TD>
                    <TD style={[styles.tdTitle]}>El/la candidato/a se describe así mismo:</TD>
                    <TD style={styles.td}>{informacionPersonal?.adjetivos}</TD>
                </TR>
                <TR>
                    <TD style={[styles.tdTitle]}>Drogas ilícitas en últimos 6 meses:</TD>
                    <TD style={styles.td}>{vicios?.drogas}</TD>
                    <TD style={[styles.tdTitle]}>Tatuajes:</TD>
                    <TD style={styles.td}>{vicios?.tatuajes}</TD>
                    <TD style={[styles.tdTitle]}>Nivel de estudio más alto:</TD>
                    <TD style={styles.td}>{informacionPersonal?.nivel_estudios}</TD>
                </TR>
            </Table>
        </View>
    )

}