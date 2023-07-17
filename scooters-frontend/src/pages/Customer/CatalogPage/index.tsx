import React, { useContext, useEffect, useState } from 'react';
import { Card, Row, Col, message, Spin, Space, Input, Button, Typography, Form, Image } from 'antd'
import { getData } from '../../../services/common/getData';
import { DollarCircleOutlined, StarOutlined, ToolOutlined } from '@ant-design/icons';
import { Rating } from 'react-simple-star-rating';
import { putData } from '../../../services/common/putData';
import { AuthContext } from '../../../context/AuthContext';
import { numberRgx } from '../../../utils/exp';

const { Meta } = Card;

interface IProduct {
    _id: any
    name: string
    price: string
    picture: string
    averageRating?: any
    autonomy: any
}

const generateAverages = (scooters: any) => {
    if (scooters.length > 0) {
        const response = scooters.map((scooter: any) => {
            let averageRating = 0
            if (scooter.ratings.length > 0) {
                const sumRatings = scooter.ratings.reduce((accumulator: any, currentValue: any) => accumulator + currentValue.value, 0);
                averageRating = sumRatings / scooter.ratings.length
            }
            return {
                ...scooter,
                averageRating
            }
        })
        return response;
    }
    return []
}

const findMaxAverageItem = (arr: any) => {
    return arr.reduce((maxItem: any, currentItem: any) => {
        if (currentItem.average > maxItem.average) {
            return currentItem;
        } else {
            return maxItem;
        }
    });
}


const itemWithMostRatings = (arr: any) => {
    return arr.reduce((prevItem: any, currentItem: any) => {
        if (currentItem.ratings.length > prevItem.ratings.length) {
            return currentItem;
        } else {
            return prevItem;
        }
    });
}



function removeDuplicates(arr: any) {
    return arr.filter((item: IProduct, index: any) => {
        const firstIndex = arr.findIndex((obj: IProduct) => obj._id === item._id);
        return index === firstIndex;
    });
}



const CatalogPage = () => {

    const { user }: any = useContext(AuthContext)

    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])

    const [initialData, setInitialData] = useState([])

    const [minPrice, setMinPrice] = useState('')
    const [maxPrice, setMaxPrice] = useState('')

    const [minAuto, setMinAuto] = useState('')
    const [maxAuto, setMaxAuto] = useState('')


    const [minRate, setMinRate] = useState('')
    const [maxRate, setMaxRate] = useState('')

    const [bestItem, setBestItem] = useState<any>(null)

    const [mostRated, setMostRated] = useState<any>(null)

    const initialRequest = async () => {
        setLoading(true)
        const request = await getData('api/scooters?justActive=' + true)
        if (request.status) {
            const finalData = generateAverages(request.data)
            console.log('finalData', finalData)

            if (finalData.length > 0) {
                const getBest = findMaxAverageItem(finalData)
                setBestItem(getBest)
                const getMostRated = itemWithMostRatings(finalData)
                setMostRated(getMostRated)
            }

            setData(finalData)
            setInitialData(finalData)
            setLoading(false)
            return;
        }
        setLoading(false)
        message.error("Algo salió mal trayendo la info!")
    }


    const handleSearchPrice = () => {
        if (minPrice === "" && maxPrice === "") {
            //setData(initialData)
            return initialData;
        }

        const copy = [...initialData]
        let filteredData = copy
        if (minPrice !== "" && maxPrice !== "") {
            filteredData = copy.filter((item: IProduct) => parseFloat(item.price) >= parseFloat(minPrice) && parseFloat(item.price) <= parseFloat(maxPrice))
            return filteredData
        }

        if (minPrice !== "" && maxPrice === "") {
            filteredData = copy.filter((item: IProduct) => parseFloat(item.price) >= parseFloat(minPrice))
            return filteredData

        }

        if (minPrice === "" && maxPrice !== "") {
            filteredData = copy.filter((item: IProduct) => parseFloat(item.price) <= parseFloat(maxPrice))
            return filteredData
        }

        return filteredData
        //setData(filteredData)
    }

    const handleSearchAuto = (data: any) => {
        if (minAuto === "" && maxAuto === "") {
            //setData(initialData)
            return data;
        }

        const copy = [...data]
        let filteredData = copy

        if (minAuto !== "" && maxAuto !== "") {
            filteredData = copy.filter((item: IProduct) => parseFloat(item.autonomy) >= parseFloat(minAuto) && parseFloat(item.autonomy) <= parseFloat(maxAuto))
        }

        if (minAuto !== "" && maxAuto === "") {
            filteredData = copy.filter((item: IProduct) => parseFloat(item.autonomy) >= parseFloat(minAuto))
        }

        if (minAuto === "" && maxAuto !== "") {
            filteredData = copy.filter((item: IProduct) => parseFloat(item.autonomy) <= parseFloat(maxAuto))
        }

        console.log('filteredData', filteredData)
        return filteredData
        //setData(filteredData)
    }


    const handleSearchRate = (data: any) => {
        if (minRate === "" && maxRate === "") {
            //setData(initialData)
            return data;
        }

        const copy = [...data]
        let filteredData = copy

        if (minRate !== "" && maxRate !== "") {
            filteredData = copy.filter((item: IProduct) => parseFloat(item.averageRating) >= parseFloat(minRate) && parseFloat(item.averageRating) <= parseFloat(maxRate))
        }

        if (minRate !== "" && maxRate === "") {
            filteredData = copy.filter((item: IProduct) => parseFloat(item.averageRating) >= parseFloat(minRate))
        }

        if (minAuto === "" && maxAuto !== "") {
            filteredData = copy.filter((item: IProduct) => parseFloat(item.averageRating) <= parseFloat(maxRate))
        }

        console.log('filteredData', filteredData)
        return filteredData
        //setData(filteredData)
    }


    const handleGeneralSearch = () => {
        const byPrice = handleSearchPrice()
        const byAuto = handleSearchAuto(byPrice)
        const byRate = handleSearchRate(byAuto)
        const unique = removeDuplicates(byRate)
        setData(unique)
    }

    const handleClean = () => {
        setData(initialData)
        setMinPrice('')
        setMaxPrice('')
        setMinAuto('')
        setMaxAuto('')
        setMinRate('')
        setMaxRate('')
    }

    useEffect(() => {
        initialRequest()
    }, [])


    const [rating, setRating] = useState(0)

    // Catch Rating value
    const handleRating = async (rate: number, itemId: any) => {
        setRating(rate)
        const dataRating = [
            {
                value: rate,
                userId: user._id
            }
        ]
        const request = await putData('api/scooters/' + itemId, { ratings: dataRating })
        if (request.status) {
            message.success("Calificación enviada exitosamente!")
            initialRequest()
        } else {
            message.error("Hubo un error al enviar la calificación")
        }
    }
    // Optinal callback functions
    const onPointerEnter = () => console.log('Enter')
    const onPointerLeave = () => console.log('Leave')
    const onPointerMove = (value: number, index: number) => console.log(value, index)

    const [form] = Form.useForm()
    return (
        <Card title="Catálogo">
            {loading && <Spin />}
            <Row>

                <Row>
                    <Col span={12}>
                        <Row>
                            <Form form={form}>
                                <Col span={24}>
                                    <DollarCircleOutlined style={{ fontSize: 18 }} /> {" "}
                                    <Typography.Text style={{ fontSize: 18 }} >Monto disponible</Typography.Text>
                                </Col>
                                <Col span={24}>
                                    <Space.Compact size="large">
                                        <Form.Item
                                            name="minMonto"
                                            rules={[
                                                { required: true, message: "Campo requerido" },
                                                { pattern: numberRgx, message: "Valor inválido" }
                                            ]}
                                        >
                                            <Input placeholder="Mínimo" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
                                        </Form.Item>
                                        <Form.Item
                                            name="minMax"
                                            rules={[
                                                { required: true, message: "Campo requerido" },
                                                { pattern: numberRgx, message: "Valor inválido" }
                                            ]}
                                        >
                                            <Input placeholder="Máximo" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
                                        </Form.Item>
                                    </Space.Compact>
                                </Col>
                                <Col span={24}>
                                    <ToolOutlined style={{ fontSize: 18 }} /> {" "}
                                    <Typography.Text style={{ fontSize: 18 }} >Autonomía</Typography.Text>
                                </Col>
                                <Col span={24}>
                                    <Space.Compact size="large">
                                        <Form.Item
                                            name="minAuto"
                                            rules={[
                                                { required: true, message: "Campo requerido" },
                                                { pattern: numberRgx, message: "Valor inválido" }
                                            ]}
                                        >
                                            <Input placeholder="Mínimo" value={minAuto} onChange={(e) => setMinAuto(e.target.value)} />
                                        </Form.Item>
                                        <Form.Item
                                            name="maxAuto"
                                            rules={[
                                                { required: true, message: "Campo requerido" },
                                                { pattern: numberRgx, message: "Valor inválido" }
                                            ]}
                                        >
                                            <Input placeholder="Máximo" value={maxAuto} onChange={(e) => setMaxAuto(e.target.value)} />
                                        </Form.Item>
                                    </Space.Compact>
                                </Col>
                                <Col span={24}>
                                    <StarOutlined style={{ fontSize: 18 }} /> {" "}
                                    <Typography.Text style={{ fontSize: 18 }} >Calificación</Typography.Text>
                                </Col>
                                <Col span={24}>
                                    <Space.Compact size="large">
                                        <Form.Item
                                            name="minRate"
                                            rules={[
                                                { required: true, message: "Campo requerido" },
                                                { pattern: numberRgx, message: "Valor inválido" }
                                            ]}
                                        >
                                            <Input placeholder="Mínima" value={minRate} onChange={(e) => setMinRate(e.target.value)} />
                                        </Form.Item>
                                        <Form.Item
                                            name="maxRate"
                                            rules={[
                                                { required: true, message: "Campo requerido" },
                                                { pattern: numberRgx, message: "Valor inválido" }
                                            ]}
                                        >
                                            <Input placeholder="Máxima" value={maxRate} onChange={(e) => setMaxRate(e.target.value)} />
                                        </Form.Item>
                                    </Space.Compact>
                                </Col>
                                <Col span={24} style={{ marginTop: 8, marginBottom: 16 }} >
                                    <Button type="primary" onClick={handleGeneralSearch}>Buscar</Button>
                                    <Button onClick={handleClean} style={{ marginLeft: 4 }}>Limpiar</Button>

                                </Col>
                            </Form>
                        </Row>
                    </Col>

                    {bestItem !== null && (
                        <Col span={5}>
                            <Row>
                                <Col span={24}>
                                    <Typography.Text strong>Nuestra recomendación</Typography.Text>
                                </Col>

                                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} >
                                    <Card
                                        hoverable
                                        cover={<Image alt="example" src={bestItem.picture} height={350} />}
                                        style={{ width: '100%', height: 525 }}
                                    >
                                        <Meta title={bestItem.name} description={"$" + bestItem.price} />
                                        <Meta description={"Autonomía: " + bestItem.autonomy} />

                                        <Typography.Text strong style={{ display: 'block' }} >Opiniones de clientes</Typography.Text>
                                        <Rating
                                            readonly
                                            initialValue={bestItem.averageRating}
                                        />


                                    </Card>

                                </Col>


                            </Row>

                        </Col>
                    )}

                    {mostRated !== null && (
                        <Col span={5} offset={1}>
                            <Row>
                                <Col span={24}>
                                    <Typography.Text strong>Más votado</Typography.Text>
                                </Col>

                                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} >
                                    <Card
                                        hoverable
                                        cover={<Image alt="example" src={mostRated.picture} height={350} />}
                                        style={{ width: '100%', height: 525 }}
                                    >
                                        <Meta title={mostRated.name} description={"$" + mostRated.price} />
                                        <Meta description={"Autonomía: " + mostRated.autonomy} />

                                        <Typography.Text strong style={{ display: 'block' }} >{mostRated.ratings.length} Votos</Typography.Text>
                                        <Typography.Text strong style={{ display: 'block' }} >Opiniones de clientes</Typography.Text>

                                        <Rating
                                            readonly
                                            initialValue={mostRated.averageRating}
                                        />


                                    </Card>

                                </Col>


                            </Row>

                        </Col>
                    )}
                </Row>

                {data && data.length > 0 &&
                    data.map((item: IProduct) => (
                        <Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6} style={{ marginTop: 16, paddingRight: 4 }}>
                            <Card
                                hoverable
                                style={{ width: '100%' }}
                                cover={<Image alt="example" src={item.picture} height={400} />}
                            >
                                <Meta title={item.name} description={"$" + item.price} />
                                <Meta description={"Autonomía: " + item.autonomy} />

                                <Rating
                                    onClick={(rate: any) => handleRating(rate, item._id)}
                                    onPointerEnter={onPointerEnter}
                                    onPointerLeave={onPointerLeave}
                                    onPointerMove={onPointerMove}
                                    initialValue={item.averageRating}
                                />
                            </Card>
                        </Col>
                    ))}
                {data && data.length === 0 && <Typography.Title style={{ textAlign: 'center' }} >No hay scooters que cumplan con los parámetros enviados</Typography.Title>}
            </Row>


        </Card >
    )
}

export default CatalogPage; 