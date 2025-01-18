import React, { useState, useEffect } from "react";
import { View, Text, Alert, TouchableOpacity } from "react-native";
import { api } from "../services/api";
import { stylesFinancialSummary } from "./styleSummayFilterModal";
import { SummaryFilterModal } from "./SummaryFilterModal"; // Novo componente de filtro
import { useFocusEffect } from "@react-navigation/native";

export function FinancialSummaryScreen() {
    const [originalData, setOriginalData] = useState<any[]>([]);
    const [filteredData, setFilteredData] = useState<any[]>([]);
    const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

    const [totalEntrada, setTotalEntrada] = useState(0);
    const [totalSaida, setTotalSaida] = useState(0);
    const [saldoTotal, setSaldoTotal] = useState(0);

    // Recarregar os dados ao acessar a tela
    useFocusEffect(
        React.useCallback(() => {
            console.log("Log 61: Fetching financial data on screen focus...");
            fetchFinancialData();
        }, [])
    );

    useEffect(() => {
        calculateSummary(filteredData);
    }, [filteredData]);

    const fetchFinancialData = async () => {
        try {
            console.log("Log 62: Making API call to fetch financial records...");
            const response = await api.get("/registros-financeiros");
            console.log("Log 63: Financial data loaded successfully", response.data);
            setOriginalData(response.data);
            setFilteredData(response.data);
        } catch (error: any) {
            console.error("Log 64: Error fetching financial records", error);
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

        console.log("Log 65: Calculated summary values: Entrada:", entrada, "Saída:", saida, "Saldo Total:", entrada - saida);
    };

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
