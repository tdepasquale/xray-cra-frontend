import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { combineValidators, isRequired } from "revalidate";
import {
  Breadcrumb,
  Button,
  Container,
  Form,
  Header,
  Icon,
  Input,
  Label,
  List,
  Modal,
  Segment,
  Table,
  TextArea,
} from "semantic-ui-react";
import agent from "../agent";
import { ITechnique, ITechniqueChart } from "../models/chart";
import DraggableRowsMobile from "./DraggableRowsMobile";
import { ModalTemplate } from "./ModalTemplate";
import { SocialLogins } from "./SocialLogins";

interface IProps {
  isDemo: boolean;
  chart: ITechniqueChart;
}

export const EditTechniqueChartMobile: React.FC<IProps> = ({
  isDemo,
  chart,
}) => {
  enum Property {
    BodyPart = 0,
    mAs = 1,
    kVp = 2,
    Notes = 3,
  }

  const [editIsOpen, setEditIsOpen] = useState(false);
  const [addIsOpen, setAddIsOpen] = useState(false);
  const [saveIsLoading, setSaveIsLoading] = useState(false);

  const initialTechnique: ITechnique = {
    id: "-1",
    index: -1,
    bodyPart: "Test",
    mAs: 0,
    kVp: 0,
    notes: "",
  };

  const [currentTechnique, setCurrentTechnique] = useState<ITechnique>(
    initialTechnique
  );

  const handleEdit = (technique: ITechnique) => {
    resetErrors();
    const currentTechnique = { ...technique };
    setCurrentTechnique(currentTechnique);
    setEditIsOpen(true);
  };

  const handleAdd = () => {
    resetErrors();
    const currentTechnique: ITechnique = {
      id: techniqueChart.techniques.length.toString() + Math.random(),
      index: techniqueChart.techniques.length,
      bodyPart: "",
      mAs: 0,
      kVp: 0,
      notes: "",
    };
    setCurrentTechnique(currentTechnique);
    setAddIsOpen(true);
  };

  const handleAddConfirm = () => {
    const errors = validateEditForm({
      bodyPart: currentTechnique.bodyPart,
      mAs: currentTechnique.mAs,
      kVp: currentTechnique.kVp,
    });
    if (Object.keys(errors).length === 0) {
      let updatedTechniqueChart: ITechniqueChart = {
        id: techniqueChart.id,
        name: techniqueChart.name,
        techniques: [...techniqueChart.techniques, currentTechnique],
        ownerUsername: techniqueChart.ownerUsername,
      };
      setTechniqueChart(updatedTechniqueChart);
      setAddIsOpen(false);
    } else setEditFormErrors(errors);
  };

  const [techniqueChart, setTechniqueChart] = useState<ITechniqueChart>(chart);

  const setTechniques = (techniques: ITechnique[]) => {
    let updatedTechniqueChart: ITechniqueChart = {
      id: techniqueChart.id,
      name: techniqueChart.name,
      techniques: [...techniques],
      ownerUsername: techniqueChart.ownerUsername,
    };
    setTechniqueChart(updatedTechniqueChart);
  };

  const handleChange = (event: any, property: Property) => {
    let updatedCurrentTechnique: ITechnique = {
      id: currentTechnique.id,
      index: currentTechnique.index,
      bodyPart: currentTechnique.bodyPart,
      mAs: currentTechnique.mAs,
      kVp: currentTechnique.kVp,
      notes: currentTechnique.notes,
    };
    switch (property) {
      case Property.BodyPart:
        updatedCurrentTechnique.bodyPart = event.target.value.substring(0, 50);
        break;
      case Property.mAs:
        if (event.target.value.length === 0)
          updatedCurrentTechnique.mAs = event.target.value;
        else
          updatedCurrentTechnique.mAs =
            event.target.value < 0
              ? 0
              : Number(Number(event.target.value).toFixed(2));
        break;
      case Property.kVp:
        if (event.target.value.length === 0)
          updatedCurrentTechnique.kVp = event.target.value;
        else
          updatedCurrentTechnique.kVp =
            event.target.value < 0
              ? 0
              : Number(Number(event.target.value).toFixed(2));
        break;
      case Property.Notes:
        updatedCurrentTechnique.notes = event.target.value.substring(0, 1000);
        break;
    }
    setCurrentTechnique(updatedCurrentTechnique);
  };

  const [editFormErrors, setEditFormErrors] = useState<object>({});

  const handleUpdate = () => {
    const errors = validateEditForm({
      bodyPart: currentTechnique.bodyPart,
      mAs: currentTechnique.mAs,
      kVp: currentTechnique.kVp,
    });
    if (Object.keys(errors).length === 0) {
      let updatedTechniqueChart: ITechniqueChart = {
        id: techniqueChart.id,
        name: techniqueChart.name,
        techniques: [...techniqueChart.techniques],
        ownerUsername: techniqueChart.ownerUsername,
      };
      updatedTechniqueChart.techniques[
        currentTechnique.index
      ] = currentTechnique;
      setTechniqueChart(updatedTechniqueChart);
      setEditIsOpen(false);
    } else setEditFormErrors(errors);
  };

  const validateEditForm = combineValidators({
    bodyPart: isRequired("Body Part"),
    mAs: isRequired("mAs"),
    kVp: isRequired("kVp"),
  });

  const resetErrors = () => {
    setEditFormErrors({});
  };

  const getErrors = () => {
    return (
      <List as="ul" className="red">
        {Object.values(editFormErrors).map((value) => (
          <List.Item as="li" key={value}>
            {value}
          </List.Item>
        ))}
      </List>
    );
  };

  const handleRemove = () => {
    let updatedTechniqueChart: ITechniqueChart = {
      id: techniqueChart.id,
      name: techniqueChart.name,
      techniques: [
        ...techniqueChart.techniques.filter(
          (technique) => technique.id !== currentTechnique.id
        ),
      ],
      ownerUsername: "blank",
    };
    updatedTechniqueChart.techniques.forEach((technique) => {
      if (technique.index > currentTechnique.index) technique.index--;
    });
    setTechniqueChart(updatedTechniqueChart);
    setEditIsOpen(false);
    resetErrors();
  };

  const handleNameChange = (event: any) => {
    let updatedTechniqueChart: ITechniqueChart = {
      id: techniqueChart.id,
      name: event.target.value,
      techniques: [...techniqueChart.techniques],
      ownerUsername: techniqueChart.ownerUsername,
    };
    setTechniqueChart(updatedTechniqueChart);
  };

  const [isOpen, setOpen] = useState(false);
  const closeModal = () => {
    setOpen(false);
  };
  const [form, setform] = useState(
    <SocialLogins closeModal={closeModal} isSignUpVariant={true} />
  );

  const handleSignup = () => {
    setform(<SocialLogins closeModal={closeModal} isSignUpVariant={true} />);
    setOpen(true);
  };

  const saveChart = async () => {
    setSaveIsLoading(true);
    try {
      await agent.TechniqueCharts.edit(techniqueChart);
      setSaveIsLoading(false);
      toast.success(`${techniqueChart.name} has been saved!`);
    } catch (error) {
      toast.error("Error saving chart");
      setSaveIsLoading(false);
    }
  };

  return (
    <div className="chart-background">
      {isDemo ? (
        <Helmet>
          <title>{`Demo Chart | Rad X-Rays`}</title>
          <meta
            property="og:image"
            content="https://takeradxrays.s3.us-east-2.amazonaws.com/optimized-hand-bones.jpg"
          />
        </Helmet>
      ) : (
        <Helmet>
          <title>{`Edit Chart | Rad X-Rays`}</title>
        </Helmet>
      )}

      <ModalTemplate isOpen={isOpen} modalBody={form} closeModal={closeModal} />
      <Container className="padding-bottom-1">
        {isDemo ? (
          <Segment>
            <Container text textAlign="justified">
              <Header as="h1" textAlign="center">
                How and Why to Use the Technique Chart Tool
              </Header>
              <p>
                Our technique chart tool is great for students, technologists
                and managers. Use it to create a chart for each room in your
                facility as required by law. Technologists and students can use
                it to keep track of ideal techniques in each room they work in.
                One of the hardest parts of being a student or starting a new
                job is getting used to the quirks of each x-ray machine, which
                includes techniques. We’ve all experienced an x-ray tube that
                shoots “hot” or “cold” and here you can keep track of everything
                you need.
              </p>
              <p>
                Drag and drop to put the chart in the order of your choosing.
                Easily adjust with the click of a button or the tap of your
                finger on mobile. Delete or add rows for specific body parts /
                positions you want in your chart. Finally, name your chart so
                you can find it easily for reference. No more relying on google
                for suggested techniques. Keep track of the ones you know work!
                Great for differentiating between adult and pediatric techniques
                as well as the asthenic, sthenic and hypersthenic patient!
              </p>
            </Container>
          </Segment>
        ) : (
          <Segment>
            <Breadcrumb className="padding-bottom-1">
              <Breadcrumb.Section as={Link} to="/my-technique-charts">
                My Technique Charts
              </Breadcrumb.Section>
              <Breadcrumb.Divider icon="right angle" />
              <Breadcrumb.Section
                as={Link}
                to={`/technique-chart/view/${chart?.id}`}
              >
                View: {chart?.name}
              </Breadcrumb.Section>
              <Breadcrumb.Divider icon="right angle" />
              <Breadcrumb.Section>Edit</Breadcrumb.Section>
            </Breadcrumb>
            <div className="important">
              **Make sure to save before leaving this page!
            </div>
          </Segment>
        )}

        {isDemo ? (
          <Segment placeholder>
            <Header as="h3" icon textAlign="center">
              <Icon name="bell" />
              This is just a demo! Sign up for free to save and share technique
              charts.
            </Header>
            <Button primary onClick={handleSignup} className="cta-button">
              Sign Up!
            </Button>
          </Segment>
        ) : null}

        <div className="border margin-bottom-1">
          <Button.Group widths="2">
            <Button
              icon
              labelPosition="right"
              color="blue"
              onClick={handleAdd}
              className="no-border-radius"
            >
              Add Technique
              <Icon name="plus" />
            </Button>
            <Button
              icon
              labelPosition="right"
              color="green"
              className="no-border-radius"
              disabled={isDemo}
              loading={saveIsLoading}
              onClick={saveChart}
            >
              Save Chart
              <Icon name="save" />
            </Button>
          </Button.Group>

          <Segment attached textAlign="center" className="no-border">
            <Icon circular color="yellow" name="warning" />
            Drag and drop rows to rearrange them.
          </Segment>
        </div>

        <Form>
          <Form.Field>
            <Input
              label="Chart Name"
              required
              value={techniqueChart.name}
              placeholder="Chart name..."
              onChange={handleNameChange}
            />
          </Form.Field>
        </Form>

        <Table inverted selectable textAlign="center" unstackable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Body Part</Table.HeaderCell>
              <Table.HeaderCell>kVp</Table.HeaderCell>
              <Table.HeaderCell>mAs</Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <DraggableRowsMobile
            Techniques={[...techniqueChart.techniques]}
            SetTechniques={setTechniques}
            HandleEdit={handleEdit}
          />
        </Table>
      </Container>

      <Modal
        dimmer="blurring"
        open={editIsOpen}
        onClose={() => setEditIsOpen(false)}
      >
        <Modal.Header>Edit Technique </Modal.Header>
        <Modal.Content>
          {getErrors()}

          <Modal.Description>
            <Form>
              <Form.Field>
                <Input
                  label="Body Part"
                  placeholder="Body Part..."
                  value={currentTechnique.bodyPart}
                  onChange={(event) => handleChange(event, Property.BodyPart)}
                />
              </Form.Field>
              <Form.Field>
                <Input
                  label="kVp"
                  placeholder="kVp..."
                  value={currentTechnique.kVp}
                  type="number"
                  step="0.01"
                  min="0"
                  onChange={(event) => handleChange(event, Property.kVp)}
                />
              </Form.Field>
              <Form.Field>
                <Input
                  label="mAs"
                  placeholder="mAs..."
                  value={currentTechnique.mAs}
                  type="number"
                  step="0.01"
                  min="0"
                  onChange={(event) => handleChange(event, Property.mAs)}
                />
              </Form.Field>
              <Form.Field>
                <Label pointing="below">Notes</Label>
                <TextArea
                  label="Notes"
                  placeholder="Distance, angle, etc..."
                  value={currentTechnique.notes}
                  onChange={(event) => handleChange(event, Property.Notes)}
                />
              </Form.Field>
            </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button.Group widths="3">
            <Button
              negative
              content="Remove"
              icon="trash alternate outline"
              labelPosition="right"
              onClick={handleRemove}
            />
            <Button color="black" onClick={() => setEditIsOpen(false)}>
              Cancel
            </Button>
            <Button
              positive
              icon="checkmark"
              labelPosition="right"
              content="Set"
              onClick={handleUpdate}
            />
          </Button.Group>
        </Modal.Actions>
      </Modal>

      <Modal
        dimmer="blurring"
        open={addIsOpen}
        onClose={() => setAddIsOpen(false)}
      >
        <Modal.Header>Add Technique</Modal.Header>
        <Modal.Content>
          {getErrors()}
          <Modal.Description>
            <Form>
              <Form.Field>
                <Input
                  required
                  label="Body Part"
                  placeholder="Body Part..."
                  value={currentTechnique.bodyPart}
                  onChange={(event) => handleChange(event, Property.BodyPart)}
                />
              </Form.Field>
              <Form.Field>
                <Input
                  label="kVp"
                  placeholder="kVp..."
                  value={currentTechnique.kVp}
                  type="number"
                  step="0.1"
                  onChange={(event) => handleChange(event, Property.kVp)}
                />
              </Form.Field>
              <Form.Field>
                <Input
                  label="mAs"
                  placeholder="mAs..."
                  value={currentTechnique.mAs}
                  type="number"
                  step="0.1"
                  onChange={(event) => handleChange(event, Property.mAs)}
                />
              </Form.Field>
              <Form.Field>
                <Label pointing="below">Notes</Label>
                <TextArea
                  aria-label="Notes"
                  placeholder="Notes..."
                  value={currentTechnique.notes}
                  onChange={(event) => handleChange(event, Property.Notes)}
                />
              </Form.Field>
            </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={() => setAddIsOpen(false)}>
            Cancel
          </Button>
          <Button
            positive
            icon="checkmark"
            labelPosition="right"
            content="Set"
            onClick={handleAddConfirm}
          />
        </Modal.Actions>
      </Modal>
    </div>
  );
};
