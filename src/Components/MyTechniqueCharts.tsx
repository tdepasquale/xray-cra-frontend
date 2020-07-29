import React, { useEffect, useState } from "react";
import {
  Container,
  Segment,
  Header,
  Icon,
  Button,
  Modal,
} from "semantic-ui-react";
import agent from "../agent";
import { ITechniqueChart } from "../models/chart";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

export const MyTechniqueCharts = () => {
  const [charts, setCharts] = useState<ITechniqueChart[]>([]);
  const [pageIsLoading, setPageIsLoading] = useState(true);
  const [addIsLoading, setAddIsLoading] = useState(false);
  const [currentChart, setCurrentChart] = useState<ITechniqueChart | null>(
    null
  );
  const [deleteIsOpen, setDeleteIsOpen] = useState(false);
  const [deleteIsLoading, setDeleteIsLoading] = useState(false);

  const getCharts = async () => {
    try {
      const chartsFromDB = await agent.TechniqueCharts.list();
      setCharts(chartsFromDB);
      setPageIsLoading(false);
    } catch (error) {
      toast.error("Error getting charts.");
    }
  };

  useEffect(() => {
    getCharts();
  }, []);

  if (pageIsLoading) return <Loading content="Loading charts..." />;

  const addChart = async () => {
    setAddIsLoading(true);
    try {
      const response = await agent.TechniqueCharts.create();
      setCharts([...charts!, response]);
      toast.success("A Blank Chart has been created.");
      setAddIsLoading(false);
    } catch (error) {
      toast.error("Error creating a Blank Chart");
    }
  };

  const deleteChart = async () => {
    setDeleteIsLoading(true);
    try {
      await agent.TechniqueCharts.delete(currentChart!.id);
      const newCharts = charts.filter((chart) => chart.id !== currentChart?.id);
      setCharts(newCharts);
      setDeleteIsLoading(false);
      setDeleteIsOpen(false);
      toast.success(`${currentChart?.name} has been deleted.`);
    } catch (error) {
      toast.error(`Error deleting ${currentChart?.name}.`);
    }
  };

  const openConfirmDelete = (selectedChart: ITechniqueChart) => {
    setCurrentChart(selectedChart);
    setDeleteIsOpen(true);
  };

  const DeleteModal = () => {
    return (
      <Modal
        dimmer="blurring"
        open={deleteIsOpen}
        onClose={() => setDeleteIsOpen(false)}
        size="tiny"
      >
        <Modal.Header>Delete Chart </Modal.Header>
        <Modal.Content>
          <Modal.Description>
            Are you sure you want to delete &nbsp;
            <strong>{currentChart?.name}</strong>
            &nbsp;?
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={() => setDeleteIsOpen(false)}>
            Cancel
          </Button>
          <Button
            negative
            content="Delete"
            onClick={deleteChart}
            loading={deleteIsLoading}
          />
        </Modal.Actions>
      </Modal>
    );
  };

  const ChartSegment = () => {
    return (
      <React.Fragment>
        <Segment attached="top">
          <Header as="h1" textAlign="center">
            My Charts
          </Header>
        </Segment>
        <Button
          icon
          labelPosition="right"
          color="blue"
          className="no-border-radius table-button"
          fluid
          onClick={addChart}
          loading={addIsLoading}
        >
          Add Chart
          <Icon name="plus square outline" />
        </Button>
        {charts?.map((chart) => (
          <Segment.Group key={chart.id}>
            <Segment textAlign="center">
              <Link
                to={`/technique-chart/view/${chart.id}`}
                className="rem-1-5"
              >
                {chart.name}
              </Link>
            </Segment>
            <Segment.Group horizontal>
              <Segment className="no-padding">
                <Button
                  as={Link}
                  to={`/technique-chart/edit/${chart.id}`}
                  icon
                  labelPosition="right"
                  color="orange"
                  className="no-border-radius table-button"
                  fluid
                >
                  Edit
                  <Icon name="edit" />
                </Button>
              </Segment>
              <Segment className="no-padding">
                <Button
                  icon
                  labelPosition="right"
                  color="red"
                  className="no-border-radius table-button"
                  fluid
                  onClick={() => openConfirmDelete(chart)}
                >
                  Delete
                  <Icon name="trash alternate outline" />
                </Button>
              </Segment>
            </Segment.Group>
          </Segment.Group>
        ))}
      </React.Fragment>
    );
  };

  const NoChartSegment = () => {
    return (
      <Segment placeholder>
        <Header icon>
          <Icon name="bell" />
          You don't seem to have any technique charts yet.
        </Header>
        <Button primary onClick={addChart} loading={addIsLoading}>
          Add technique chart
        </Button>
      </Segment>
    );
  };

  return (
    <div className="chart-background">
      <Helmet>
        <title>{`My Charts | Rad X-Rays`}</title>
      </Helmet>
      <Container text className="padding-bottom-1">
        {charts.length === 0 ? <NoChartSegment /> : <ChartSegment />}
      </Container>
      <DeleteModal />
    </div>
  );
};
