import { useState } from 'react';
import { Col, Container, Placeholder, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import CollectionCard from '../components/CollectionCard';
import AddFAB from '../components/AddFAB';
import noDataSVG from '../assets/no_data.svg';
import NoData from '../components/NoData';
import CollectionModal from '../components/CollectionModal';
import { useGetAllCollectionsQuery } from '../slices/collectionApiSlice';

const CollectionsScreen = () => {
    const [showCollectionModal, setShowCollectionModal] = useState(false);
    
    const {data: collections, error, isLoading} = useGetAllCollectionsQuery(undefined, {
        selectFromResult: ({data, error, isLoading}) => ({
            data: data?.filter((collection) => !collection.isTrash),
            error,
            isLoading
        })
    });

    const handleOnNewCollectionClick = () => {
        setShowCollectionModal(true);
    }

    const handleCollectionModalOnClose = () => {
        setShowCollectionModal(false);
    }

    return (
        <div className='scrollbar-gutter-stable p-3 h-100'>
            <Container className="h-100">
                <Row className=''>
                    <Col className='h-100 d-flex flex-column pb-5'>
                        <Row className='mb-3 justify-content-between align-items-center'>
                            <Col xs='auto'>
                                <span className='icon-link color-navy'>
                                    <FontAwesomeIcon icon={faFolder}/>
                                    <h5 className='m-0'>Collections</h5>
                                </span>
                            </Col>
                            <Col xs='auto'>
                                <span className='icon-link color-navy'>
                                    {collections?.length === 1 ?  collections?.length + ' collection' : collections?.length + ' collections' } 
                                </span>
                            </Col>
                        </Row>
                        <Row className='flex-grow-1 gy-3 pb-5'>
                            {isLoading ? (
                                    <Placeholder xs={12} className='h-100'></Placeholder>
                                ) : collections?.length === 0 ? (
                                    <NoData 
                                        message='No collections'
                                        image={noDataSVG}/>
                                ) : ( 
                                    collections?.map((collection, i) => {
                                        return (
                                            <Col xs={6} lg={4} xl={3} key={i}>
                                               <CollectionCard 
                                                    collectionID={collection._id} 
                                                    title={collection.title}
                                                    updatedAt={collection.updatedAt} />
                                            </Col>
                                        )
                                    })
                                ) 
                            }
                        </Row>
                    </Col>
                </Row>
            </Container>

            <AddFAB onClick={handleOnNewCollectionClick} />

            <CollectionModal
                showCollectionModal={showCollectionModal}
                onClose={handleCollectionModalOnClose}
            />
        </div>
    )
}

export default CollectionsScreen;