import { useState, useEffect, useContext } from "react";
import { Card, Tag, message } from "antd";
import { Button, Input, Table, Modal } from "antd";
import type { ColumnsType } from "antd/es/table";
import { postData } from "../../../services/common/postData";
import { getData } from "../../../services/common/getData";
import PersonalForm from "../../../components/Forms/PersonalForm";
import { AuthContext } from "../../../context/AuthContext";

interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
}


const CustomersPage = () => {
    const { user }: any = useContext(AuthContext);
    const [loadingData, setLoadingData] = useState(false);
    const [initialData, setInitialData] = useState<any[]>([]);
    const [patients, setPatients] = useState<any[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState({});

    const [isInformOpen, setIsInformOpen] = useState(false);

    const ChangeState = async (id: any) => {
        try {
            const request = await postData("api/users/changestate", { id: id });

            if (request.status) {
                handleCancel();
                message.success("Cambio de estado exitoso");
            }

            const UpdatePatients = patients.map((proyectoState) =>
                proyectoState._id === request.msg._id ? request.msg : proyectoState
            );
            setPatients(UpdatePatients);
        } catch (error) {
            console.log(error);
        }
    };

    const getPatients = async () => {
        setLoadingData(true);
        const requestPatients = await getData("api/users/customers");
        if (requestPatients.status) {
            setPatients(requestPatients.data);
            setInitialData(requestPatients.data);
        }
        setLoadingData(false);
    };
    useEffect(() => {
        getPatients();
    }, []);

    const showModal = (record: any) => {
        setSelectedPatient(record)
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setSelectedPatient({})
        setIsModalOpen(false);
    };

    const showInformModal = (record: any) => {
        setSelectedPatient(record)
        setIsInformOpen(true);
    }


    const handleCancelInformModal = () => {
        setSelectedPatient({})
        setIsInformOpen(false);
    };

    const columns: ColumnsType<DataType> = [
        {
            title: "Nombre",
            dataIndex: "firstname",
            key: "name",
            width: "30%"
        },
        {
            title: "Apellido",
            dataIndex: "lastname",
            key: "age",
            width: "20%"
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "address",
            responsive: ["lg", "xl", "xxl"]
        },
        {
            title: "Estado",
            key: "active",
            width: "20%",
            render: (record) => (
                <p>
                    {record.active ? (
                        <Tag color="blue">Activo</Tag>
                    ) : (
                        <Tag color="red">Inactivo</Tag>
                    )}
                </p>
            ),
            responsive: ["lg", "xl", "xxl"],
            filters: [
                {
                    text: 'Activo',
                    value: 'A',
                },
                {
                    text: 'Inactivo',
                    value: 'I',
                },
            ],
            onFilter: (value: any, record: any) => {
                const parsedValue = value === "I" ? false : true
                return record.active === parsedValue
            }
        },
        {
            title: "Acciones",
            dataIndex: "",
            key: "x",
            render: (record) => (
                <div>
                    {user.isAdmin && (
                        <Button
                            onClick={() => ChangeState(record._id)}
                            type="primary"
                            style={{ marginBottom: 16 }}
                        >
                            {record.active ? "Desactivar" : "Activar"}
                        </Button>
                    )}
                </div>
            ),
        },
    ];


    return (
        <Card title="Clientes">
            <Input
                allowClear={true}
                placeholder="Buscar..."
                onChange={(e) => {
                    const value = e.target.value;
                    if (value !== "") {
                        const copy = [...patients]
                        const filtered = copy.filter((sp) => sp.firstname.toLowerCase().includes(value.toLowerCase()) || sp.lastname.toLowerCase().includes(value.toLowerCase()) || sp.email.toLowerCase().includes(value.toLowerCase()))
                        setPatients(filtered)
                        return;
                    }
                    if (value === "") {
                        setPatients(initialData)
                    }
                }} />
            <Table loading={loadingData} columns={columns} dataSource={patients} />
        </Card>
    );
};

export default CustomersPage;
