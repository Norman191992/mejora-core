import { useState, useEffect } from "react";
import { Card, Tag, message } from "antd";
import { Button, Input, Table, Modal } from "antd";
import type { ColumnsType } from "antd/es/table";
import { postData } from "../../../services/common/postData";
import { getData } from "../../../services/common/getData";
import PersonalForm from "../../../components/Forms/PersonalForm";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
}


const PersonalPage = () => {
  const [loadingData, setLoadingData] = useState(false);
  const [initialData, setInitialData] = useState<any[]>([]);
  const [specialists, setSpecialists] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const ChangeState = async (id: any) => {
    try {
      const request = await postData("api/users/changestate", { id: id });

      if (request.status) {
        handleCancel();
        message.success("Cambio de estado exitoso");
      }

      const UpdateSpecialits = specialists.map((proyectoState) =>
        proyectoState._id === request.msg._id ? request.msg : proyectoState
      );
      setSpecialists(UpdateSpecialits);
    } catch (error) {
      console.log(error);
    }
  };

  const getSpecialists = async () => {
    setLoadingData(true);
    const requestSpecialists = await getData("api/users/admins");
    if (requestSpecialists.status) {
      setSpecialists(requestSpecialists.data);
      setInitialData(requestSpecialists.data);
    }
    setLoadingData(false);
  };
  useEffect(() => {
    getSpecialists();
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
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
        <Button
          onClick={() => ChangeState(record._id)}
          type="primary"
          style={{ marginBottom: 16 }}
        >
          {record.active ? "Desactivar" : "Activar"}
        </Button>
      ),
    },
  ];


  return (
    <Card
      title="Personal"
      extra={
        <Button onClick={showModal} type="primary" style={{ marginBottom: 16 }}>
          Agregar Admin
        </Button>
      }
    >
      <Input
        allowClear={true}
        placeholder="Buscar..."
        onChange={(e) => {
          const value = e.target.value;
          if (value !== "") {
            const copy = [...specialists]
            const filtered = copy.filter((sp) => sp.firstname.toLowerCase().includes(value.toLowerCase()) || sp.lastname.toLowerCase().includes(value.toLowerCase()) || sp.email.toLowerCase().includes(value.toLowerCase()))
            setSpecialists(filtered)
            return;
          }
          if (value === "") {
            setSpecialists(initialData)
          }
        }} />
      <Table loading={loadingData} columns={columns} dataSource={specialists} />
      <Modal
        title="Nuevo Admin"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <PersonalForm
          handleCancel={handleCancel}
          setSpecialists={setSpecialists}
          specialists={specialists}
        />
      </Modal>
    </Card>
  );
};

export default PersonalPage;
