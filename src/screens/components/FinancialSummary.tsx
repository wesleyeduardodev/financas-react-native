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
        console.log("FinancialSummary mounted");
        fetchFinancialData();
    }, []);

    useEffect(() => {
        console.log("Filtered data updated:", filteredData);
        calculateSummary(filteredData);
    }, [filteredData]);

    const fetchFinancialData = async () => {
        console.log("Fetching financial data...");
        try {
            const response = await api.get("/registros-financeiros");
            console.log("Financial data fetched successfully:", response.data);
            setOriginalData(response.data);
            setFilteredData(response.data);
        } catch (error: any) {
            console.error("Error fetching financial data:", error);
            Alert.alert(
                "Erro ao carregar dados financeiros",
                error.response?.data?.message || error.message || "Não foi possível carregar os dados financeiros."
            );
        }
    };

    const calculateSummary = (data: any[]) => {
        console.log("Calculating summary...");
        const entrada = data
            .filter((item: any) => item.tipoRegistro === 0)
            .reduce((acc: number, curr: any) => acc + curr.valor, 0);

        const saida = data
            .filter((item: any) => item.tipoRegistro === 1)
            .reduce((acc: number, curr: any) => acc + curr.valor, 0);

        console.log("Total Entrada:", entrada, "Total Saída:", saida);
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
        const formattedValue = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
            minimumFractionDigits: 2,
        });
        console.log("Formatted currency:", formattedValue);
        return formattedValue;
    };

    return (
        <View style={stylesFinancialSummary.container}>
            <View style={stylesFinancialSummary.header}>
                <Text style={stylesFinancialSummary.title}>Resumo Financeiro</Text>
                <TouchableOpacity
                    style={stylesFinancialSummary.filterButton}
                    onPress={() => {
                        console.log("Opening filter modal");
                        setIsFilterModalVisible(true);
                    }}
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
                    label: `${item.percent}%`,
                }))}
                width={Dimensions.get("window").width - 40}
                height={220}
                chartConfig={{
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                }}
                accessor={"total"}
                backgroundColor={"transparent"}
                paddingLeft={"10"}
                absolute={false}
            />

            <SummaryFilterModal
                visible={isFilterModalVisible}
                onClose={() => {
                    console.log("Closing filter modal");
                    setIsFilterModalVisible(false);
                }}
                onApplyFilters={(filters) => {
                    console.log("Applying filters:", filters);
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

                    console.log("Filtered data after applying filters:", filtered);
                    setFilteredData(filtered);
                    setIsFilterModalVisible(false);
                }}
            />
        </View>
    );
}
