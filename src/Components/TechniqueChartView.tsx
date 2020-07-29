import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Container,
  Segment,
  Breadcrumb,
  Table,
  Button,
  Icon,
  Modal,
  Header,
} from "semantic-ui-react";
import Loading from "./Loading";
import agent from "../agent";
import { ITechniqueChart, ITechnique } from "../models/chart";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";

export const TechniqueChartView = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [chart, setChart] = useState<ITechniqueChart | null>(null);
  const [notesModalIsOpen, setNotesModalIsOpen] = useState(false);
  const [currentTechnique, setCurrentTechnique] = useState<ITechnique | null>(
    null
  );

  useEffect(() => {
    const getChart = async () => {
      try {
        const chartFromDB: ITechniqueChart = await agent.TechniqueCharts.get(
          id!
        );
        setChart(chartFromDB);
        setIsLoading(false);
      } catch (error) {
        toast.error("Error getting chart.");
      }
    };
    getChart();
  }, [id]);

  if (isLoading) return <Loading content="Loading chart..." />;

  const handleModal = (technique: ITechnique) => {
    setCurrentTechnique(technique);
    setNotesModalIsOpen(true);
  };

  const techniqueRows = chart?.techniques.map((technique) => (
    <React.Fragment key={technique.id}>
      <Table.Row>
        <Table.Cell>{technique.bodyPart}</Table.Cell>
        <Table.Cell>{technique.kVp}</Table.Cell>
        <Table.Cell>{technique.mAs}</Table.Cell>
        {technique.notes.length > 0 ? (
          technique.notes.length > 15 ? (
            <Table.Cell className="printing-hide">
              <Button
                compact
                icon
                size="mini"
                labelPosition="right"
                color="blue"
                className="no-border-radius table-button"
                onClick={() => handleModal(technique)}
              >
                Notes
                <Icon name="file alternate outline" />
              </Button>
            </Table.Cell>
          ) : (
            <Table.Cell className="printing-hide">{technique.notes}</Table.Cell>
          )
        ) : (
          <Table.Cell></Table.Cell>
        )}

        {technique.notes.length > 0 ? (
          <Table.Cell className="hide printing-show printing-limit-width">
            {technique.notes}
          </Table.Cell>
        ) : null}
      </Table.Row>
    </React.Fragment>
  ));

  const NotesModal = () => {
    return (
      <Modal
        dimmer="blurring"
        open={notesModalIsOpen}
        onClose={() => setNotesModalIsOpen(false)}
        size="tiny"
      >
        <Modal.Header>Notes for {currentTechnique?.bodyPart}</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            {currentTechnique?.notes.length === 0 ? (
              <p>There are not any notes for this technique.</p>
            ) : (
              <p>{currentTechnique?.notes}</p>
            )}
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={() => setNotesModalIsOpen(false)}>
            Close
          </Button>
        </Modal.Actions>
      </Modal>
    );
  };

  const CurrentBreadcrumbs = () => {
    return (
      <Segment className="printing-hide">
        <Breadcrumb className="padding-bottom-1">
          <Breadcrumb.Section as={Link} to="/my-technique-charts">
            My Technique Charts
          </Breadcrumb.Section>
          <Breadcrumb.Divider icon="right angle" />
          <Breadcrumb.Section>View</Breadcrumb.Section>
        </Breadcrumb>
      </Segment>
    );
  };

  return (
    <div className="chart-background">
      <Helmet>
        <title>{`View Chart | Rad X-Rays`}</title>
        <meta
          property="og:image"
          content="https://takeradxrays.s3.us-east-2.amazonaws.com/optimized-hand-bones.jpg"
        />
      </Helmet>
      <NotesModal />
      <Container className="padding-bottom-1">
        <CurrentBreadcrumbs />
        <Segment textAlign="center">
          <Header as="h2">{chart?.name}</Header>
        </Segment>
        <Table inverted selectable unstackable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell className="font-heavy">
                Body Part
              </Table.HeaderCell>
              <Table.HeaderCell className="font-heavy">kVp</Table.HeaderCell>
              <Table.HeaderCell className="font-heavy">mAs</Table.HeaderCell>
              <Table.HeaderCell className="font-heavy">
                <span className="hide printing-show">Notes</span>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>{techniqueRows}</Table.Body>
        </Table>
      </Container>
    </div>
  );
};
