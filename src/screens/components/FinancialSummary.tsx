import React, { useState, useEffect } from "react";
import { View, Text, Alert, Dimensions, TouchableOpacity } from "react-native";
import { api } from "../services/api";
import { stylesFinancialSummary } from "./styleSummayFilterModal";
import { PieChart } from "react-native-chart-kit";
import { SummaryFilterModal } from "./SummaryFilterModal"; // Novo componente de filtro

export function FinancialSummary() {
    const [originalData, setOriginalData] = useState<any[]>([]);
    const [filteredData, setFilteredData] = useState<any[]>([]);
    const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

    const [totalEntrada, setTotalEntrada] = useState(0);
    const [totalSaida, setTotalSaida] = useState(0);
    const [saldoTotal, setSaldoTotal] = useState(0);

    useEffect(() => {
        fetchFinancialData();
    }, []);

    useEffect(() => {
        calculateSummary(filteredData);
    }, [filteredData]);

    const fetchFinancialData = async () => {
        try {
            const response = await api.get("/registros-financeiros");
            setOriginalData(response.data);
            setFilteredData(response.data);
        } catch (error: any) {
            Alert.alert(
                "Erro ao carregar dados financeiros",
                error.response?.data?.message || error.message || "Não foi possível carregar os dados financeiros."
            );
        }
    };

    const calculateSummary = (data: any[]) => {
        const entrada = data
            .filter((item: any) => item.tipoRegistro === 0)
            .reduce((acc: number, curr: any) => acc + curr.valor, 0);

        const saida = data
            .filter((item: any) => item.tipoRegistro === 1)
            .reduce((acc: number, curr: any) => acc + curr.valor, 0);

        setTotalEntrada(entrada);
        setTotalSaida(saida);
        setSaldoTotal(entrada - saida);
    };

    const total = totalEntrada + totalSaida;

    const pieChartData = [
        {
            name: "Entrada",
            total: totalEntrada,
            color: "#28A745",
            legendFontColor: "#333",
            legendFontSize: 14,
            percent: total > 0 ? ((totalEntrada / total) * 100).toFixed(2) : "0.00",
        },
        {
            name: "Saída",
            total: totalSaida,
            color: "#DC3545",
            legendFontColor: "#333",
            legendFontSize: 14,
            percent: total > 0 ? ((totalSaida / total) * 100).toFixed(2) : "0.00",
        },
    ];

    const formatCurrency = (value: number) => {
        return value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
            minimumFractionDigits: 2,
        });
    };

    return (
        <View style={stylesFinancialSummary.container}>
            <View style={stylesFinancialSummary.header}>
                <Text style={stylesFinancialSummary.title}>Resumo Financeiro</Text>
                <TouchableOpacity
                    style={stylesFinancialSummary.filterButton}
                    onPress={() => setIsFilterModalVisible(true)}
                >
                    <Text style={stylesFinancialSummary.filterButtonText}>Filtros</Text>
                </TouchableOpacity>
            </View>

            <View style={stylesFinancialSummary.summaryCard}>
                <Text style={stylesFinancialSummary.label}>Total de Entrada:</Text>
                <Text style={stylesFinancialSummary.valueEntrada}>{formatCurrency(totalEntrada)}</Text>
            </View>
            <View style={stylesFinancialSummary.summaryCard}>
                <Text style={stylesFinancialSummary.label}>Total de Saída:</Text>
                <Text style={stylesFinancialSummary.valueSaida}>{formatCurrency(totalSaida)}</Text>
            </View>
            <View style={stylesFinancialSummary.summaryCard}>
                <Text style={stylesFinancialSummary.label}>Saldo Total:</Text>
                <Text style={stylesFinancialSummary.valueSaldo}>{formatCurrency(saldoTotal)}</Text>
            </View>

            {/* Gráfico de Pizza */}
            <Text style={stylesFinancialSummary.title}>Comparação de Totais</Text>
            <PieChart
                data={pieChartData.map((item) => ({
                    name: item.name,
                    total: item.total,
                    color: item.color,
                    legendFontColor: item.legendFontColor,
                    legendFontSize: item.legendFontSize,
                    label: `${item.percent}%`, // Percentual como label
                }))}
                width={Dimensions.get("window").width - 40} // Ajusta ao tamanho da tela
                height={220}
                chartConfig={{
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                }}
                accessor={"total"}
                backgroundColor={"transparent"}
                paddingLeft={"10"}
                absolute={false} // Exibe percentuais dentro do gráfico
            />

            <SummaryFilterModal
                visible={isFilterModalVisible}
                onClose={() => setIsFilterModalVisible(false)}
                onApplyFilters={(filters) => {
                    let filtered = [...originalData];

                    if (filters.tipoRegistro !== null) {
                        filtered = filtered.filter((item) => item.tipoRegistro === filters.tipoRegistro);
                    }
                    if (filters.tipoTransacao !== null) {
                        filtered = filtered.filter((item) => item.tipoTransacao === filters.tipoTransacao);
                    }
                    if (filters.categoria !== null) {
                        filtered = filtered.filter((item) => item.idCategoria === filters.categoria);
                    }
                    if (filters.subCategoria !== null) {
                        filtered = filtered.filter((item) => item.idSubCategoria === filters.subCategoria);
                    }

                    setFilteredData(filtered);
                    setIsFilterModalVisible(false);
                }}
            />
        </View>
    );
}
