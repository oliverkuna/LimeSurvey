<?php

namespace ls\tests;

use Yii;

class SurveyInheritanceMechanismTest extends TestBaseClass
{
    private static $surveysGroup;
    private static $surveysGroupSettings;

    public static function setUpBeforeClass(): void
    {
        parent::setUpBeforeClass();

        // Creating a new custom group.
        $surveysGroup = new \SurveysGroups();
        $surveysGroup->name = 'new_group';
        $surveysGroup->sortorder = 0;
        $surveysGroup->created_by = 1;
        $surveysGroup->title = 'New Survey Group';
        $surveysGroup->description = 'A new test survey group.';
        $surveysGroup->owner_id = 1;
        $surveysGroup->alwaysavailable = 1;
        $surveysGroup->save();

        $surveysGroupSettings = new \SurveysGroupsettings();
        $surveysGroupSettings->gsid = $surveysGroup->gsid;
        $surveysGroupSettings->owner_id = -1;
        $surveysGroupSettings->admin = 'inherit';
        $surveysGroupSettings->anonymized = 'Y';
        $surveysGroupSettings->format = 'G';
        $surveysGroupSettings->savetimings = 'Y';
        $surveysGroupSettings->template = 'bootswatch';
        $surveysGroupSettings->save();

        self::$surveysGroup = $surveysGroup;
        self::$surveysGroupSettings = $surveysGroupSettings;
    }

    public static function tearDownAfterClass(): void
    {
        parent::tearDownAfterClass();

        // Deleting group and its settings.
        self::$surveysGroup->delete();
        self::$surveysGroupSettings->delete();
    }

    public function testSetGlobalGroupOptions()
    {
        $survey = new \Survey();

        // Asserting that the options have not been initialized yet.
        $this->assertNull($survey->oOptions, 'The survey options object should be null since it has not been initialized yet.');
        $this->assertNull($survey->oOptionLabels, 'The survey option labels object should be null since it has not been initialized yet.');
        $this->assertEmpty($survey->aOptions, 'The survey options array should be empty since options have not been initialized yet.');

        // Initializing
        $survey->bShowRealOptionValues = false;
        $survey->setOptions(0);

        // Asserting that the options have been initialized correctly.
        $instance = \SurveysGroupsettings::getInstance(0, $survey, null, 1, $survey->bShowRealOptionValues);

        $this->assertEquals($instance->oOptions, $survey->oOptions, 'The options object was not correctly initialized.');
        $this->assertEquals($instance->oOptionLabels, $survey->oOptionLabels, 'The option labels object was not correctly initialized.');
        $this->assertEquals((array)$instance->oOptions, $survey->aOptions, 'The options array was not correctly initialized.');
        $this->assertSame($instance->showInherited, $survey->showInherited, 'The showInherited attribute was not correctly initialized.');
    }

    public function testSetDefaultGroupOptions()
    {
        $survey = new \Survey();

        // Asserting that the options have not been initialized yet.
        $this->assertNull($survey->oOptions, 'The survey options object should be null since it has not been initialized yet.');
        $this->assertNull($survey->oOptionLabels, 'The survey option labels object should be null since it has not been initialized yet.');
        $this->assertEmpty($survey->aOptions, 'The survey options array should be empty since options have not been initialized yet.');

        // Initializing
        $survey->setOptions();

        // Asserting that the options have been initialized correctly.
        $instance = \SurveysGroupsettings::getInstance(1, $survey, null, 1, $survey->bShowRealOptionValues);

        $this->assertEquals($instance->oOptions, $survey->oOptions, 'The options object was not correctly initialized.');
        $this->assertEquals($instance->oOptionLabels, $survey->oOptionLabels, 'The option labels object was not correctly initialized.');
        $this->assertEquals((array)$instance->oOptions, $survey->aOptions, 'The options array was not correctly initialized.');
        $this->assertSame($instance->showInherited, $survey->showInherited, 'The showInherited attribute was not correctly initialized.');
    }

    public function testSetSpecificGroupOptions()
    {
        $survey = new \Survey();
        $survey->bShowRealOptionValues = false;

        // Asserting that the options have not been initialized yet.
        $this->assertNull($survey->oOptions, 'The survey options object should be null since it has not been initialized yet.');
        $this->assertNull($survey->oOptionLabels, 'The survey option labels object should be null since it has not been initialized yet.');
        $this->assertEmpty($survey->aOptions, 'The survey options array should be empty since options have not been initialized yet.');

        $survey->setOptions((int)self::$surveysGroup->gsid);

        // Asserting that the options have been initialized correctly.
        $instance = \SurveysGroupsettings::getInstance((int)self::$surveysGroup->gsid, $survey, null, 1, $survey->bShowRealOptionValues);

        $this->assertEquals($instance->oOptions, $survey->oOptions, 'The options object was not correctly initialized.');
        $this->assertEquals($instance->oOptionLabels, $survey->oOptionLabels, 'The option labels object was not correctly initialized.');
        $this->assertEquals((array)$instance->oOptions, $survey->aOptions, 'The options array was not correctly initialized.');
        $this->assertSame($instance->showInherited, $survey->showInherited, 'The showInherited attribute was not correctly initialized.');

        // Checking specific custom group values.
        $this->assertSame('Y', $survey->oOptions->anonymized, 'The anonymized attribute was set to Y in the group.');
        $this->assertSame('Y', $survey->aOptions['savetimings'], 'The savetimings attribute was set to Y in the group.');
        $this->assertSame('bootswatch', $survey->aOptions['template'], 'The template attribute was set to bootswatch in the group.');
    }

    public function testSetSpecificGroupOptionsButShowingRealOptionValues()
    {
        $survey = new \Survey();

        // Asserting that the options have not been initialized yet.
        $this->assertNull($survey->oOptions, 'The survey options object should be null since it has not been initialized yet.');
        $this->assertNull($survey->oOptionLabels, 'The survey option labels object should be null since it has not been initialized yet.');
        $this->assertEmpty($survey->aOptions, 'The survey options array should be empty since options have not been initialized yet.');

        // Asserting that bShowRealOptionValues is true by default.
        $this->assertTrue($survey->bShowRealOptionValues, 'The bShowRealOptionValues attributes should be true by default.');

        $survey->setOptions((int)self::$surveysGroup->gsid);

        // Asserting that the options have been initialized correctly.
        $instance = \SurveysGroupsettings::getInstance((int)self::$surveysGroup->gsid, $survey, null, 1, $survey->bShowRealOptionValues);

        $this->assertEquals($instance->oOptions, $survey->oOptions, 'The options object was not correctly initialized.');
        $this->assertEquals($instance->oOptionLabels, $survey->oOptionLabels, 'The option labels object was not correctly initialized.');
        $this->assertEquals((array)$instance->oOptions, $survey->aOptions, 'The options array was not correctly initialized.');
        $this->assertSame($instance->showInherited, $survey->showInherited, 'The showInherited attribute was not correctly initialized.');

        // Checking specific custom group values.
        $this->assertNotSame('Y', $survey->oOptions->anonymized, 'The anonymized attribute should not be taken from the custom group.');
        $this->assertNotSame('Y', $survey->aOptions['savetimings'], 'The savetimings attribute should not be taken from the custom group.');
    }
}
